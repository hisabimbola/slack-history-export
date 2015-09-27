'use strict';

import _ from 'lodash';
import {SlackAPI} from './slack.api.js';

export function processIM(token, username) {
  return new Promise((resolve, reject) => {
    const slack = new SlackAPI(token);
    let imTotalHistory = [], user = {};
    fetchUsers(slack, username).then((user) => {
      fetchIMs(slack, user.id).then((imInfo) => {
        getIMHistory(imInfo.id).then((history) => {
          cleanData(history).then(cleanHistory => {
            resolve(cleanHistory);
          }).catch(error => {
            reject(error);
          });
        }).catch(error => {
          reject(error);
        });
      }).catch(error => {
        reject(error);
      });
    }).catch(error => {
      reject(error);
    });

    function fetchUsers(slack, username) {
      return new Promise((resolve, reject) => {
        slack.users().then((users) => {
          user = getUserInfo(users, username);
          if (!user) {
            throw new Error('Username is invalid, please check and try again.');
          }
          resolve(user);
        }).catch(error => {
          reject(error);
        });
      });
    }

    function getUserInfo(users, username) {
      return _.find(users.members, (user) => {
        return user.name === username;
      });
    }

    function fetchIMs(slack, userId) {
      return new Promise((resolve, reject) => {
        slack.im().then(IMs => {
          let imInfo = getUserIMInfo(IMs, userId);
          if (!imInfo) {
            throw new Error('You do not have any IM history with this user');
          }
          resolve(imInfo);
        }).catch((error) => {
          reject(error);
        });
      });
    }
    function getSelfData() {
      return new Promise((resolve, reject) => {
        slack.getSelfData().then(userData => {
          resolve(userData);
        }).catch(error => {
          reject(error);
        });
      });
    }
    function getUserIMInfo(ims, userId) {
      return _.find(ims.ims, (im) => {
        return im.user === userId;
      });
    }

    function getIMHistory(channel, latest) {
      return new Promise((resolve, reject) => {
        slack.imHistory({channel, latest}).then((imHistory) => {
          imTotalHistory.push(...imHistory.messages);
          if (imHistory.has_more) {
            return Promise.all([getIMHistory(channel, imHistory.messages[imHistory.messages.length - 1].ts)]).then(function() {
              resolve(imTotalHistory);
            });
          } else {
            resolve(imTotalHistory);
          }
        }).catch((error) => {
          reject(error);
        });
      });
    }

    function cleanData(data) {
      return new Promise((resolve, reject) => {
        let formatDate = function(_data) {
          _data.date = _data.ts;
          delete _data.ts;
          _data.date = new Date(_data.date*1e3);
          return _data;
        };
        getSelfData().then(userData => {
          for(let msg of data) {
            if (msg.user === userData.user_id) {
              msg.user = userData.user;
              msg = formatDate(msg);
            } else {
              msg.user = user.name;
              msg = formatDate(msg);
            }
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    }
  });
}
