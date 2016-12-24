import test from 'tape'
import sinon from 'sinon'
import streamTest from 'streamtest'
import SlackHistoryExport from 'main'

let SLACK_API_TOKEN

if (process.env.CI === 'true')
  SLACK_API_TOKEN = process.env.SLACK_API_TOKEN
else
  SLACK_API_TOKEN = process.env.npm_config_slacktoken

test('SlackHistoryExport is a function', (t) => {
  t.equal(typeof SlackHistoryExport, 'function')

  t.end()
})

test(`SlackHistoryExport
  should initialize default values and methods`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })

  t.ok(slackHistoryExport.args)
  t.ok(slackHistoryExport.slack, 'Slack api method is present')
  t.ok(slackHistoryExport.fetchIMHistory, 'fetchIMHistory method is present')
  t.ok(slackHistoryExport.fetchUserDetail, 'fetchUserDetail method is present')
  t.ok(slackHistoryExport.fetchIMInfo, 'fetchIMInfo method is present')
  t.end()
})

test(`SlackHistoryExport::fetchIMInfo
  should fetch IM info for a user`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  slackHistoryExport.slack = {
    im: () => Promise.resolve({
      ims: [
        {
          user: 'USLACKBOT',
        },
        {
          user: 'U024BE7LH',
        },
      ],
    }),
  }
  const mockUserObj = {
    id: 'USLACKBOT',
    user: 'SLACKBOT',
  }
  slackHistoryExport.fetchIMInfo(mockUserObj).then((result) => {
    t.equal(result.user, 'USLACKBOT', 'User imInfo is fetch')
    t.end()
  })
})

test(`SlackHistoryExport::fetchUserDetail
  should fetchUserDetail`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  slackHistoryExport.slack = {
    users: () => Promise.resolve({
      members: [
        {
          id: 'U023BECGF',
          name: 'bobby',
        },
      ],
    }),
  }
  slackHistoryExport.fetchUserDetail('bobby').then((result) => {
    t.equal(result.name, 'bobby', 'User details is returned')
    t.end()
  })
})

test(`SlackHistoryExport::fetchIMHistory
  should fetchAll userHistory and stream out`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  const mockObj = {
    ok: true,
    messages: [
      {
        type: 'message',
        ts: '1358546515.000008',
        user: 'U2147483896',
        text: 'Hello',
      },
      {
        type: 'message',
        ts: '1358546515.000007',
        user: 'U2147483896',
        text: 'World',
        is_starred: true,
      },
      {
        type: 'something_else',
        ts: '1358546515.000007',
        wibblr: true,
      },
    ],
    has_more: false,
  }
  slackHistoryExport.slack = {
    imHistory: () => Promise.resolve(mockObj),
  }
  const outputStream = streamTest['v2'].toText((err, result) => {
    t.notOk(err, 'No error occurred')
    const _result = JSON.parse(result)
    t.deepEqual(_result, mockObj.messages)
    t.end()
  })
  slackHistoryExport.fetchIMHistory(false, outputStream, 'CHANNEL')
})

test(`SlackHistoryExport::processIMs
  should fetchAll userHistory and stream out`, (t) => {
  const mockUserObj = {
    id: 'INVALID',
    user: 'SLACKBOT',
  }
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  const userDetailStub = sinon.stub(slackHistoryExport, 'fetchUserDetail')
  userDetailStub.onFirstCall().returns(Promise.resolve(mockUserObj))
  const imInfoStub = sinon.stub(slackHistoryExport, 'fetchIMInfo')
  imInfoStub.onFirstCall().returns(Promise.resolve({ }))
  const mockObj = {
    ok: true,
    messages: [
      {
        type: 'message',
        ts: '1358546515.000008',
        user: 'U2147483896',
        text: 'Hello',
      },
      {
        type: 'message',
        ts: '1358546515.000007',
        user: 'U2147483896',
        text: 'World',
        is_starred: true,
      },
      {
        type: 'something_else',
        ts: '1358546515.000007',
        wibblr: true,
      },
    ],
    has_more: false,
  }
  slackHistoryExport.slack = {
    imHistory: () => Promise.resolve(mockObj),
  }
  const outputStream = streamTest['v2'].toText((err, result) => {
    t.notOk(err, 'No error occurred')
    const _result = JSON.parse(result)
    t.deepEqual(_result, mockObj.messages)
    t.end()
  })
  slackHistoryExport.fetchIMHistory(false, outputStream, 'CHANNEL')
})

test(`SlackHistoryExport::fetchIMHistory
  should fetch more user history and stream out`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  const mockObj1 = {
    ok: true,
    messages: [
      {
        type: 'message',
        ts: '1358546515.000008',
        user: 'U2147483896',
        text: 'Hello',
      },
      {
        type: 'message',
        ts: '1358546515.000007',
        user: 'U2147483896',
        text: 'World',
        is_starred: true,
      },
      {
        type: 'something_else',
        ts: '1358546515.000007',
        wibblr: true,
      },
    ],
    has_more: true,
  }
  const mockObj2 = {
    ok: true,
    messages: [
      {
        type: 'message',
        ts: '1358546515.000008',
        user: 'U2147483896',
        text: 'Hello',
      },
      {
        type: 'message',
        ts: '1358546515.000007',
        user: 'U2147483896',
        text: 'World',
        is_starred: true,
      },
      {
        type: 'something_else',
        ts: '1358546515.000007',
        wibblr: true,
      },
    ],
    has_more: false,
  }
  const stub = sinon.stub(slackHistoryExport.slack, 'imHistory')
  stub.onFirstCall().returns(Promise.resolve(mockObj1))
  stub.onSecondCall().returns(Promise.resolve(mockObj2))


  const outputStream = streamTest['v2'].toText((err, result) => {
    t.notOk(err, 'No error occurred')
    const _result = JSON.parse(result)
    t.deepEqual(_result, mockObj1.messages.concat(mockObj2.messages))
    slackHistoryExport.slack.imHistory.restore()
    t.end()
  })
  slackHistoryExport.fetchIMHistory(false, outputStream, 'CHANNEL')
})

test(`SlackHistoryExport::fetchIMInfo
  should return an error if userInfo does not exist`, (t) => {
  const slackHistoryExport = new SlackHistoryExport({ token: SLACK_API_TOKEN })
  slackHistoryExport.slack = {
    im: () => Promise.resolve({
      ims: [
        {
          user: 'USLACKBOT',
        },
        {
          user: 'U024BE7LH',
        },
      ],
    }),
  }
  const mockUserObj = {
    id: 'INVALID',
    user: 'SLACKBOT',
  }
  slackHistoryExport.fetchIMInfo(mockUserObj)
    .then(t.fail)
    .catch((error) => {
      t.equal(
        error,
        'You do not have any IM history with this user:SLACKBOT',
        'Error is returned if no imInfo is found',
      )
      t.end()
    })
})
