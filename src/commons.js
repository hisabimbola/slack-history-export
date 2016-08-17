'use strict';

import _ from 'lodash';
import {SlackAPI} from './slack.api.js';
import jsonfile from 'jsonfile';
import csv from 'fast-csv';

jsonfile.spaces = 4;

function fetchGroups(slack) {
  return new Promise((resolve, reject) => {
    slack.groups().then((groups) => {
      resolve(groups);
    }).catch(error => {
      reject(error);
    });
  });
}

function getGroupHistory(slack, groupTotalHistory, channel, latest) {
  return slack.groupHistory({channel, latest}).then((groupHistory) => {
    groupTotalHistory.push(...groupHistory.messages);
    if (groupHistory.has_more) {
      return Promise.all([getGroupHistory(slack, groupTotalHistory, channel, groupHistory.messages[groupHistory.messages.length - 1].ts)]).then(function() {
        return groupTotalHistory.reverse();
      });
    } else {
      return groupTotalHistory.reverse();
    }
  });
}

function getGroupInfo(data, groupName) {
  return _.find(data.groups, (group) => {
    return group.name === groupName;
  });
}

function reverseUserId(slack, data) {
  return slack.users().then(users => {
    for (let msg of data) {
      if (msg.user) {
        const userObj = getUserInfoById(users, msg.user);
        msg.user = userObj ? userObj.name : msg.user;
      }
    }
    return data;
  });
}

function fetchChannels(slack) {
  return slack.channels();
}

function getChannelHistory(slack, channelTotalHistory, channel, latest) {
  return slack.channelsHistory({channel, latest}).then((channelHistory) => {
    channelTotalHistory.push(...channelHistory.messages);
    if (channelHistory.has_more) {
      return Promise.all([getChannelHistory(slack, channelTotalHistory, channel, channelHistory.messages[channelHistory.messages.length - 1].ts)]).then(function() {
        return channelTotalHistory.reverse();
      });
    } else {
      return channelTotalHistory.reverse();
    }
  });
}

function getChannelInfo(data, channelName) {
  return _.find(data.channels, (channel) => {
    return channel.name === channelName;
  });
}

function fetchUser(slack, username) {
  return slack.users().then((users) => {
    const user = getUserInfo(users, username);
    if (!user) {
      throw new Error('Username is invalid, please check and try again.');
    }
    return user;
  });
}

// TODO #refactor map user id to userobj
function getUserInfoById(users, userid) {
  return _.find(users.members, (user) => {
    return user.id === userid;
  });
}

function getUserInfo(users, username) {
  return _.find(users.members, (user) => {
    return user.name === username;
  });
}

function fetchIMs(slack, userId) {
  return slack.im().then(IMs => {
    const imInfo = getUserIMInfo(IMs, userId);
    if (!imInfo) {
      throw new Error('You do not have any IM history with this user');
    }
    return imInfo;
  });
}

function getSelfData(slack) {
  return slack.getSelfData();
}

function getUserIMInfo(ims, userId) {
  return _.find(ims.ims, (im) => {
    return im.user === userId;
  });
}

function getIMHistory(slack, imTotalHistory, channel, latest) {
  return slack.imHistory({channel, latest}).then((imHistory) => {
    imTotalHistory.push(...imHistory.messages);
    if (imHistory.has_more) {
      return Promise.all([getIMHistory(slack, imTotalHistory, channel, imHistory.messages[imHistory.messages.length - 1].ts)]).then(function() {
        return imTotalHistory.reverse();
      });
    } else {
      return imTotalHistory.reverse();
    }
  });
}

function formatDate(data) {
  for (let msg of data) {
    msg.date = +(msg.ts*1e3).toString().split('.')[0]; //TODO Sadly, can't remember why I have to multiply. find out why
  }
  return data;
}

function cleanData(slack, data, user) {
  return getSelfData(slack).then(userData => {
    for(let msg of data) {
      if (msg.user === userData.user_id) {
        msg.user = userData.user;
      } else {
        msg.user = user.name;
      }
    }
    return formatDate(data);
  });
}

export function processIM(args) {
  const slack = new SlackAPI(args.token);
  const imTotalHistory = [];
  let user = {};
  return fetchUser(slack, args.username).then((userObj) => {
    user = userObj;
    return fetchIMs(slack, user.id).then((imInfo) => {
      return getIMHistory(slack, imTotalHistory, imInfo.id).then((history) => {
        const _refinedHistory = cleanData(slack, history, user);
        return saveData(_refinedHistory, args, args.username);
      });
    });
  });
}

export function processGroup(args) {
  const slack = new SlackAPI(args.token);
  return fetchGroups(slack).then(groups => {
    const group = getGroupInfo(groups, args.group);
    if (!group) {
      throw new Error("Group does not exist. Check group name and try again.");
    }
    let groupTotalHistory = [];
    return getGroupHistory(slack, groupTotalHistory, group.id).then((groupHistory) => {
      return reverseUserId(slack, groupHistory).then(refinedHistory => {
        const _refinedHistory = formatDate(refinedHistory);
        return saveData(_refinedHistory, args, args.group);
      });
    });
  });
}

export function processChannel(args) {
  const slack = new SlackAPI(args.token);
  return fetchChannels(slack).then(channels => {
    const channel = getChannelInfo(channels, args.channel);
    if (!channel) {
      throw new Error("Channel does not exist. Check channel name and try again.");
    }
    let channelTotalHistory = [];
    return getChannelHistory(slack,channelTotalHistory,channel.id).then((channelHistory) => {
      return reverseUserId(slack, channelHistory).then(refinedHistory => {
        const _refinedHistory = formatDate(refinedHistory);
        return saveData(_refinedHistory, args, args.channel);
      });
    });
  });
}

function saveDataAsJSON(data, args, filename) {
  return new Promise((resolve, reject) => {
    const currentDir = args.directory || process.cwd();
    const filePath = (args.filename) ? (/\.json$/.test(args.filename)) ? `${currentDir}/${args.filename}` : `${currentDir}/${args.filename}.json` : `${currentDir}/${Date.now()}-${filename}-slack-history.json`;
    jsonfile.writeFile(`${filePath}`, data, function(err) {
      if (!err) {
        resolve({path: filePath});
      } else {
        reject(err);
      }
    });
  });
}

function saveDataAsCSV(data, args, filename) {
  return new Promise((resolve, reject) => {
    const currentDir = args.directory || process.cwd();
    const filePath = (args.filename) ? (/\.csv$/.test(args.filename)) ? `${currentDir}/${args.filename}` : `${currentDir}/${args.filename}.csv` : `${currentDir}/${Date.now()}-${filename}-slack-history.csv`;
    if (args.type === 'dm' || args.username) {
      writeToCsvDM(filePath,data, (err)=> {
        if (err) {
          return reject(err);
        }
        resolve({path: filePath});
      });
    } else {
      const channelName = args.group || args.channel; //Provided both are exclusive, bad hack.
      writeToCsvGroup(filePath,data,channelName,(err)=> {
        if (err) {
          return reject(err);
        }
        resolve({path: filePath});
      });
    }
  });
}

function saveData(data, args, filename) {
  if (args.format === 'csv') {
    return saveDataAsCSV(data, args, filename);
  } else if (args.format && args.format !== 'json') {
    return Promise.reject(`Format '${args.format}' not supported`);
  } else {
    return saveDataAsJSON(data, args, filename);
  }
}

function writeToCsvDM(filePath,data, cb) {
  csv.writeToPath(`${filePath}`, data, {
    headers: true,
    transform: (row) => {
      return {
        Date: row.date,
        User: row.user,
        Message: row.text
      };
    }
  }).on('finish', () => {
    cb();
  });
}

function writeToCsvGroup(filePath,data,channel, cb) {
  csv.writeToPath(`${filePath}`, data, {
    headers: true,
    transform: (row) => {
      return {
        timestamp: row.date,
        channel: channel,
        username: row.user,
        text: row.text
      };
    }
  }).on('finish', () => {
    cb();
  });
}
