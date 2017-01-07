import slack from 'slack'

export default class SlackAPI {
  constructor (token) {
    this.token = token
    this.slack = slack
  }

  users () {
    return new Promise((resolve, reject) => {
      this.slack.users.list({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  channels () {
    return new Promise((resolve, reject) => {
      this.slack.channels.list({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  channelHistory (channel, latest) {
    return new Promise((resolve, reject) => {
      const params = { token: this.token, channel, latest }
      this.slack.channels.history(params, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  groups () {
    return new Promise((resolve, reject) => {
      this.slack.groups.list({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  groupHistory (channel, latest) {
    return new Promise((resolve, reject) => {
      const params = { token: this.token, channel, latest }
      this.slack.groups.history(params, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  im () {
    return new Promise((resolve, reject) => {
      this.slack.im.list({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  imHistory (channel, latest) {
    return new Promise((resolve, reject) => {
      const params = { token: this.token, channel, latest }
      this.slack.im.history(params, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  mpim () {
    return new Promise((resolve, reject) => {
      this.slack.mpim.list({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  mpimHistory (channel, latest) {
    return new Promise((resolve, reject) => {
      const params = { token: this.token, channel, latest }
      this.slack.mpim.history(params, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
  getSelfData () {
    return new Promise((resolve, reject) => {
      this.slack.auth.test({ token: this.token }, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      })
    })
  }
}
