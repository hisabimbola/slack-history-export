#! /usr/bin/env node

'use strict';

let SlackClient = require('slack-api-client');

export class SlackAPI {
  constructor(token) {
    this.slackToken = token;
    this.slack = SlackAPI.initSlack(this.slackToken);
  }
  static initSlack(token) {
    return new SlackClient(token);
  }

  users() {
    return new Promise((resolve, reject) => {
      this.slack.api.users.list((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  channels() {
    return new Promise((resolve, reject) => {
      this.slack.api.channels.list({}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  groups() {
    return new Promise((resolve, reject) => {
      this.slack.api.groups.list({}, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  im() {
    return new Promise((resolve, reject) => {
      this.slack.api.im.list((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

