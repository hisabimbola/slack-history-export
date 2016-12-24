import _ from 'lodash'

export function getUserInfo (users, username) {
  const _user = _.find(
    users.members,
    user => user.name.toLowerCase() === username.toLowerCase()
  )
  if (_user)
    return Promise.resolve(_user)
  return Promise.reject('Username is invalid, please check and try again.')
}

export function getUserIMInfo (ims, userObj) {
  const _im = _.find(
    ims.ims,
    im => im.user.toLowerCase() === userObj.id.toLowerCase()
  )

  if (_im)
    return Promise.resolve(_im)
  return Promise.reject(
    `You do not have any IM history with this user:${userObj.user}`
  )
}
