import Slack from 'slack-node'

export default class SlackAPI {
  constructor (token) {
    this.slackToken = token
    this.slack = new Slack(token)
  }

  users () {
    return new Promise((resolve, reject) => {
      this.slack.api('users.list', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  channels () {
    return new Promise((resolve, reject) => {
      this.slack.api('channels.list', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  channelHistory () {
    return new Promise((resolve, reject) => {
      this.slack.api('channels.history', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  groups () {
    return new Promise((resolve, reject) => {
      this.slack.api('groups.list', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  groupHistory () {
    return new Promise((resolve, reject) => {
      this.slack.api('groups.history', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  im () {
    return new Promise((resolve, reject) => {
      this.slack.api('im.list', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  imHistory () {
    return new Promise((resolve, reject) => {
      this.slack.api('im.history', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  mpim () {
    return new Promise((resolve, reject) => {
      this.slack.api('mpim.list', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  mpimHistory () {
    return new Promise((resolve, reject) => {
      this.slack.api('mpim.history', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  getSelfData () {
    return new Promise((resolve, reject) => {
      this.slack.api('auth.test', (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
}
