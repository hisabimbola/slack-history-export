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
    api: (endpoint, cb) => {
      cb(null, {})
    },
  }
}

const mockSlackErr = function mockSlackErr () {
  return {
    api: (endpoint, cb) => {
      cb(new Error(), null)
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
  t.ok(slackApi.slackToken, 'Slack token is set')
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.users().then((result) => {
    t.equal(
      spy.args[0][0],
      'users.list',
      'Users list method is called with \'users.list\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.channels().then((result) => {
    t.equal(
      spy.args[0][0],
      'channels.list',
      'channels list method is called with \'channels.list\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.channelHistory().then((result) => {
    t.equal(
      spy.args[0][0],
      'channels.history',
      'channel history method is called with \'channels.history\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.groups().then((result) => {
    t.equal(
      spy.args[0][0],
      'groups.list',
      'groups method is called with \'groups.list\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.groupHistory().then((result) => {
    t.equal(
      spy.args[0][0],
      'groups.history',
      'group history method is called with \'groups.history\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.im().then((result) => {
    t.equal(
      spy.args[0][0],
      'im.list',
      'im method is called with \'im.list\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.imHistory().then((result) => {
    t.equal(
      spy.args[0][0],
      'im.history',
      'im history method is called with \'im.history\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.mpim().then((result) => {
    t.equal(
      spy.args[0][0],
      'mpim.list',
      'mpim list method is called with \'mpim.list\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.mpimHistory().then((result) => {
    t.equal(
      spy.args[0][0],
      'mpim.history',
      'mpim history method is called with \'mpim.history\''
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
  const spy = sinon.spy(slackApi.slack, 'api')
  slackApi.getSelfData().then((result) => {
    t.equal(
      spy.args[0][0],
      'auth.test',
      'getSelfData method is called with \'auth.test\''
    )
    t.ok(result, 'getSelfData promise is resolved successfully')
    t.end()
  })
})

test(`SlackApi::getSelfData
  should return getSelfData in slack org`, (t) => {
  const slackApi = new SlackApi(SLACK_API_TOKEN)
  slackApi.slack = mockSlackErr()
  slackApi.getSelfData().catch((result) => {
    t.ok(result, 'getSelfData promise is rejected when error')
    t.end()
  })
})
