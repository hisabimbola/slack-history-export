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
    return this.fetchUserDetail(this.args.username).then(
      userObj => this.fetchIMInfo(userObj).then(
        imInfo => this.fetchIMHistory(outputStream, imInfo.id)
      )
    ).catch(error => console.error(error))
  }
  fetchIMInfo (userObj) {
    return this.slack.im().then(ims => getUserIMInfo(ims, userObj))
  }
  fetchUserDetail (username) {
    return this.slack.users().then(users => getUserInfo(users, username))
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
