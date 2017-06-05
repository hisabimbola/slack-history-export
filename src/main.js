import _ from 'lodash'
import SlackApi from './slack.api'
import {
  getUserInfo,
  getUserIMInfo,
  getGroupInfo,
  getChannelInfo,
} from './utils'

export default class SlackHistoryExport {
  constructor (args, logger) {
    this.args = args
    this.logger = logger
    this.slack = new SlackApi(this.args.token)
  }
  processIMs (outputStream) {
    return this.fetchUserDetail(this.args.username).then(
      userObj => this.fetchIMInfo(userObj).then(
        imInfo => this.fetchIMHistory(outputStream, imInfo.id)
      )
    )
  }
  processGroups (outputStream) {
    return this.fetchGroupDetails(this.args.group).then(
      groupObj => this.fetchGroupHistory(outputStream, groupObj.id)
    )
  }
  processChannels (outputStream) {
    return this.fetchChannelDetails(this.args.channel).then(
      channelObj => this.fetchChannelHistory(outputStream, channelObj.id)
    )
  }
  fetchGroupDetails (groupName) {
    return this.slack.groups().then(groups => getGroupInfo(groups, groupName))
  }
  fetchChannelDetails (chanName) {
    return this.slack.channels().then(chans => getChannelInfo(chans, chanName))
  }
  fetchIMInfo (userObj) {
    return this.slack.im().then(ims => getUserIMInfo(ims, userObj))
  }
  fetchUserDetail (username) {
    return this.slack.users().then(users => getUserInfo(users, username))
  }
  fetchGroupHistory (outputStream, channel, latest, fnCalled) {
    if (!fnCalled)
      outputStream.write('[\n')
    return this.slack.groupHistory(channel, latest).then((groupHistory) => {
      _.each(groupHistory.messages, (message, index) => {
        outputStream.write(JSON.stringify(message, null, 2))

        if (groupHistory.has_more || index !== groupHistory.messages.length - 1)
          outputStream.write(',')
      })
      if (groupHistory.has_more)
        return this.fetchGroupHistory(
          outputStream,
          channel,
          groupHistory.messages[groupHistory.messages.length - 1].ts,
          true,
        )
      if (outputStream !== process.stdout)
        outputStream.end(']\n')
      else
        outputStream.write(']\n')
      return Promise.resolve()
    })
  }
  fetchChannelHistory (outputStream, channel, latest, fnCalled) {
    if (!fnCalled)
      outputStream.write('[\n')
    return this.slack.channelHistory(channel, latest).then((chanHistory) => {
      _.each(chanHistory.messages, (message, index) => {
        outputStream.write(JSON.stringify(message, null, 2))

        if (chanHistory.has_more || index !== chanHistory.messages.length - 1)
          outputStream.write(',')
      })
      if (chanHistory.has_more)
        return this.fetchChannelHistory(
          outputStream,
          channel,
          chanHistory.messages[chanHistory.messages.length - 1].ts,
          true,
        )
      if (outputStream !== process.stdout)
        outputStream.end(']\n')
      else
        outputStream.write(']\n')
      return Promise.resolve()
    })
  }
  fetchIMHistory (outputStream, channel, latest, fnCalled) {
    if (!fnCalled)
      outputStream.write('[\n') // Use to detect the first call of the method
    return this.slack.imHistory(channel, latest).then((imHistory) => {
      _.each(imHistory.messages, (message, index) => {
        outputStream.write(JSON.stringify(message, null, 2))

        if (imHistory.has_more || index !== imHistory.messages.length - 1)
          outputStream.write(',')
      })
      if (imHistory.has_more)
        return this.fetchIMHistory(
          outputStream,
          channel,
          imHistory.messages[imHistory.messages.length - 1].ts,
          true,
        )
      if (outputStream !== process.stdout) // Process.stdout cannot be closed
        outputStream.end(']\n')
      else
        outputStream.write(']\n')

      return Promise.resolve()
    })
  }
}
