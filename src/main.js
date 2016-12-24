import _ from 'lodash'
import SlackApi from './slack.api'
import { getUserInfo, getUserIMInfo } from './utils'

export default class SlackHistoryExport {
  constructor (args, logger) {
    this.args = args
    this.logger = logger
    this.slack = new SlackApi(this.args.token)
  }
  processIMs (outputStream) {
    this.fetchUserDetail(this.args.username).then((userObj) => {
      this.fetchIMInfo(userObj).then((imInfo) => {
        this.fetchIMHistory(outputStream, imInfo.id)
      })
    })
  }
  fetchIMInfo (userObj) {
    return this.slack.im().then(ims => getUserIMInfo(ims, userObj))
  }
  fetchUserDetail (username) {
    return this.slack.users().then(users => getUserInfo(users, username))
  }
  fetchIMHistory (fnCalled, outputStream, channel, latest) {
    if (!fnCalled)
      outputStream.write('[\n') // Use to detect the first call of the method
    this.slack.imHistory({ channel, latest }).then((imHistory) => {
      _.each(imHistory.messages, (message, index) => {
        outputStream.write(JSON.stringify(message, null, 2))

        if (imHistory.has_more || index !== imHistory.messages.length - 1)
          outputStream.write(',')
      })
      if (imHistory.has_more)
        return this.fetchIMHistory(
          true,
          outputStream,
          channel,
          imHistory.messages[imHistory.messages.length - 1].ts
        )
      outputStream.end(']\n')
      return Promise.resolve()
    })
  }
}
