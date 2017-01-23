import test from 'tape'
import {
  getUserInfo,
  getUserIMInfo,
  getGroupInfo,
  getChannelInfo,
} from 'utils'

test(`getChannelInfo
  should be a function`, (t) => {
  t.equal(typeof getChannelInfo, 'function', 'getChannelInfo is a function')
  t.end()
})

test(`getChannelInfo
  should find channel in a list of channels`, (t) => {
  const mockChannelList = {
    channels: [
      {
        id: 'U023BECGF',
        name: 'admins',
      },
    ],
  }
  const chanName = 'admins'
  getChannelInfo(mockChannelList, chanName).then((result) => {
    t.ok(result)
    t.equal(result.name, 'admins', 'Channel details is returned')
    t.end()
  })
})

test(`getChannelInfo
  should return an error if channel name does not exist`, (t) => {
  const mockChannelList = {
    channels: [
      {
        id: 'U023BECGF',
        name: 'admins',
      },
    ],
  }
  const chanName = 'Anonymous'
  getChannelInfo(mockChannelList, chanName)
    .then(t.fail)
    .catch((error) => {
      t.ok(error)
      t.equal(
        error,
        'ChannelName is invalid, please check and try again.',
        'Error message is returned.')
      t.end()
    })
})

test(`getGroupInfo
  should be a function`, (t) => {
  t.equal(typeof getGroupInfo, 'function', 'getGroupInfo is a function')
  t.end()
})

test(`getGroupInfo
  should find group in a list of groups`, (t) => {
  const mockGroupList = {
    groups: [
      {
        id: 'U023BECGF',
        name: 'admins',
      },
    ],
  }
  const groupName = 'admins'
  getGroupInfo(mockGroupList, groupName).then((result) => {
    t.ok(result)
    t.equal(result.name, 'admins', 'Groups details is returned')
    t.end()
  })
})

test(`getGroupInfo
  should return an error if groupname does not exist`, (t) => {
  const mockGroupList = {
    groups: [
      {
        id: 'U023BECGF',
        name: 'admins',
      },
    ],
  }
  const groupName = 'Anonymous'
  getGroupInfo(mockGroupList, groupName)
    .then(t.fail)
    .catch((error) => {
      t.ok(error)
      t.equal(
        error,
        'GroupName is invalid, please check and try again.',
        'Error message is returned.')
      t.end()
    })
})

test(`getUserInfo
  should be a function`, (t) => {
  t.equal(typeof getUserInfo, 'function', 'getUserInfo is a function')
  t.end()
})

test(`getUserIMInfo
  should be a function`, (t) => {
  t.equal(typeof getUserIMInfo, 'function', 'getUserIMInfo is a function')
  t.end()
})

test(`getUserInfo
  should find user in a list of users`, (t) => {
  const mockUserList = {
    members: [
      {
        id: 'U023BECGF',
        name: 'bobby',
      },
    ],
  }
  const username = 'bobby'
  getUserInfo(mockUserList, username).then((result) => {
    t.ok(result)
    t.equal(result.name, 'bobby', 'User details is returned')
    t.end()
  })
})

test(`getUserInfo
  should return an error if username does not exist`, (t) => {
  const mockUserList = {
    members: [
      {
        id: 'U023BECGF',
        name: 'bobby',
      },
    ],
  }
  const username = 'Anonymous'
  getUserInfo(mockUserList, username)
    .then(t.fail)
    .catch((error) => {
      t.ok(error)
      t.equal(
        error,
        'Username is invalid, please check and try again.',
        'Error message is returned.')
      t.end()
    })
})

test(`getUserIMInfo
  should find imInfo for a user`, (t) => {
  const mockUserList = {
    ims: [
      {
        user: 'USLACKBOT',
      },
      {
        user: 'U024BE7LH',
      },
    ],
  }
  const mockUserObj = {
    id: 'USLACKBOT',
    user: 'SLACKBOT',
  }
  getUserIMInfo(mockUserList, mockUserObj).then((result) => {
    t.ok(result)
    t.equal(result.user, 'USLACKBOT', 'User imInfo is fetch')
    t.end()
  })
})

test(`getUserIMInfo
  should return an error if username does not exist`, (t) => {
  const mockUserList = {
    ims: [
      {
        user: 'USLACKBOT',
      },
      {
        user: 'U024BE7LH',
      },
    ],
  }
  const mockUserObj = {
    id: 'INVALID',
    user: 'SLACKBOT',
  }
  getUserIMInfo(mockUserList, mockUserObj)
    .then(t.fail)
    .catch((error) => {
      t.ok(error)
      t.equal(
        error,
        `You do not have any IM history with this user:${mockUserObj.user}`,
        'Error message is returned.')
      t.end()
    })
})
