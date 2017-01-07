import test from 'tape'
import SlackApi from 'slack.api'
import sinon from 'sinon'


let SLACK_API_TOKEN

if (process.env.CI === 'true')
  SLACK_API_TOKEN = process.env.SLACK_API_TOKEN
else
  SLACK_API_TOKEN = process.env.npm_config_slacktoken

const mockSlack = function mockSlack () {
  return {
    user: {
      list: (token, cb) => {
        cb(null, {})
      },
    },
    channels: {
      list: (token, cb) => {
        cb(null, {})
      },
      history: (token, cb) => {
        cb(null, {})
      },
    },
    groups: {
      list: (token, cb) => {
        cb(null, {})
      },
      history: (token, cb) => {
        cb(null, {})
      },
    },
    im: {
      list: (token, cb) => {
        cb(null, {})
      },
      history: (token, cb) => {
        cb(null, {})
      },
    },
    mpim: {
      list: (token, cb) => {
        cb(null, {})
      },
      history: (token, cb) => {
        cb(null, {})
      },
    },
    auth: {
      test: (token, cb) => {
        cb(null, {})
      },
    },
  }
}
const mockSlackErr = function mockSlackErr () {
  return {
    user: {
      list: (token, cb) => {
        cb(new Error(), null)
      },
    },
    channels: {
      list: (token, cb) => {
        cb(new Error(), null)
      },
      history: (token, cb) => {
        cb(new Error(), null)
      },
    },
    groups: {
      list: (token, cb) => {
        cb(new Error(), null)
      },
      history: (token, cb) => {
        cb(new Error(), null)
      },
    },
    im: {
      list: (token, cb) => {
        cb(new Error(), null)
      },
      history: (token, cb) => {
        cb(new Error(), null)
      },
    },
    mpim: {
      list: (token, cb) => {
        cb(new Error(), null)
      },
      history: (token, cb) => {
        cb(new Error(), null)
      },
    },
    auth: {
      test: (token, cb) => {
        cb(new Error(), null)
      },
    },
  }
}

test('SlackApi is a function', (t) => {
  t.equal(typeof SlackApi, 'function')

  t.end()
})

test(`SlackApi
  should initialize default values and methods`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)

  t.ok(slackApi.slack, 'a new instance of slack api is created')
  t.ok(slackApi.token, 'Slack token is set')
  t.ok(slackApi.users, 'users list method is present')
  t.ok(slackApi.channels, 'channels list method is present')
  t.ok(slackApi.channelHistory, 'channelHistory method is present')
  t.ok(slackApi.groups, 'groups list method is present')
  t.ok(slackApi.groupHistory, 'groupHistory method is present')
  t.ok(slackApi.im, 'im list method is present')
  t.ok(slackApi.imHistory, 'imHistory method is present')
  t.ok(slackApi.mpim, 'mpim list method is present')
  t.ok(slackApi.mpimHistory, 'mpimHistory method is present')
  t.ok(slackApi.getSelfData, 'getSelfData is present')
  t.end()
})

test(`SlackApi::users
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.user, 'list')
  slackApi.users().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'User list method first arg is params containing token'
    )
    t.ok(result, 'Users list is resolved successfully')
    t.end()
  })
})

test(`SlackApi::users
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.users().catch((error) => {
    t.ok(error, 'Users Promise is rejected if error occurred')
    t.end()
  })
})

test(`SlackApi::channels
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.channels, 'list')
  slackApi.channels().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Channels list method first arg is params containing token'
    )
    t.ok(result, 'Channels list is resolved successfully')
    t.end()
  })
})

test(`SlackApi::channels
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.channels().catch((error) => {
    t.ok(error, 'Channels Promise is rejected if error occurred')
    t.end()
  })
})

test(`SlackApi::channelHistory
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.channels, 'history')
  slackApi.channelHistory().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Channels history method first arg is params containing token'
    )
    t.ok(result, 'Channel history is resolved successfully')
    t.end()
  })
})

test(`SlackApi::channelHistory
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.channelHistory().catch((error) => {
    t.ok(error, 'ChannelHistory promise is rejected if error')
    t.end()
  })
})

test(`SlackApi::groups
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.groups, 'list')
  slackApi.groups().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Groups list method first arg is params containing token'
    )
    t.ok(result, 'Groups list promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::groups
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.groups().catch((error) => {
    t.ok(error, 'Groups list Promise is rejected when error')
    t.end()
  })
})

test(`SlackApi::groupHistory
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.groups, 'history')
  slackApi.groupHistory().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Groups history method first arg is params containing token'
    )
    t.ok(result, 'Groups history promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::groupHistory
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.groupHistory().catch((error) => {
    t.ok(error, 'Groups history promise is rejected when error')
    t.end()
  })
})

test(`SlackApi::im
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.im, 'list')
  slackApi.im().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Im list method first arg is params containing token'
    )
    t.ok(result, 'Im promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::im
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.im().catch((error) => {
    t.ok(error, 'Im promise is rejected when error')
    t.end()
  })
})

test(`SlackApi::imHistory
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.im, 'history')
  slackApi.imHistory().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Im history method first arg is params containing token'
    )
    t.ok(result, 'Im history promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::imHistory
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.imHistory().catch((error) => {
    t.ok(error, 'Im history promise is rejected')
    t.end()
  })
})

test(`SlackApi::mpim
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.mpim, 'list')
  slackApi.mpim().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Mpim list method first arg is params containing token'
    )
    t.ok(result, 'mpim list promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::mpim
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.mpim().catch((result) => {
    t.ok(result, 'mpim list promise is rejected')
    t.end()
  })
})

test(`SlackApi::mpimHistory
  should resolve if no error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.mpim, 'history')
  slackApi.mpimHistory().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Mpim history method first arg is params containing token'
    )
    t.ok(result, 'mpim history promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::mpimHistory
  should reject if error`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.mpimHistory().catch((result) => {
    t.ok(result, 'mpim history promise is rejected')
    t.end()
  })
})

test(`SlackApi::getSelfData
  should return getSelfData in slack org`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlack()
  const spy = sinon.spy(slackApi.slack.auth, 'test')
  slackApi.getSelfData().then((result) => {
    t.deepEqual(
      spy.args[0][0],
      { token: SLACK_API_TOKEN },
      'Auth test method first arg is params containing token'
    )
    t.ok(result, 'getSelfData promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::getSelfData
  should reject when error occurs`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.getSelfData().catch((result) => {
    t.ok(result, 'getSelfData promise is rejected when error')
    t.end()
  })
})
