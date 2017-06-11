import _ from 'lodash'
import nconf from 'nconf'
import untildify from 'untildify'

export function fetchToken (token) {
  if (token)
    return token
  // TODO: Can improve by allowing users to pass in the file path for token
  // Setup nconf hierachy token resolve
  nconf
    .env()
    .file({ file: untildify('~/.config/slack-history-export/config.json') })

  return nconf.get('SLACK_HISTORY_EXPORT_TOKEN')
}

export function getUserInfo (users, username) {
  const _user = _.find(
    users.members,
    user => user.name.toLowerCase() === username.toLowerCase(),
  )
  if (_user)
    return Promise.resolve(_user)
  return Promise.reject('Username is invalid, please check and try again.')
}

export function getUserIMInfo (ims, userObj) {
  const _im = _.find(
    ims.ims,
    im => im.user.toLowerCase() === userObj.id.toLowerCase(),
  )

  if (_im)
    return Promise.resolve(_im)
  return Promise.reject(
    `You do not have any IM history with this user:${userObj.user}`,
  )
}

export function getGroupInfo (groups, groupName) {
  const _group = _.find(
    groups.groups,
    group => group.name.toLowerCase() === groupName.toLowerCase(),
  )
  if (_group)
    return Promise.resolve(_group)
  return Promise.reject('GroupName is invalid, please check and try again.')
}

export function getChannelInfo (channels, chanName) {
  const _channel = _.find(
    channels.channels,
    channel => channel.name.toLowerCase() === chanName.toLowerCase(),
  )
  if (_channel)
    return Promise.resolve(_channel)
  return Promise.reject('ChannelName is invalid, please check and try again.')
}
