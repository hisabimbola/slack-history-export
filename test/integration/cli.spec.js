import { exec } from 'child_process'
import test from 'tape'
import tmp from 'tmp'
import fs from 'fs'
import { version } from '../../package.json'

const binPath = './bin/slack-history-export.js'

let SLACK_API_TOKEN

if (process.env.CI === 'true')
  SLACK_API_TOKEN = process.env.SLACK_API_TOKEN
else
  SLACK_API_TOKEN = process.env.npm_config_slacktoken


test(`CLI
  help flag`, (t) => {
  exec(`${binPath} --help`, (error, stdout, stderr) => {
    t.true(String(stdout).match(/help/), 'outputs help text')
    t.false(error || stderr, 'returns no error')
    t.end()
  })
})

test(`CLI
  version flag`, (t) => {
  exec(`${binPath} --version`, (error, stdout, stderr) => {
    t.equal(stdout, `${version}\n`, 'outputs current version number')
    t.false(error || stderr, 'returns no error')
    t.end()
  })
})

test(`CLI
  should export slack im history`, (t) => {
  exec(`${binPath} -t ${SLACK_API_TOKEN} -u slackbot`,
    (error, stdout, stderr) => {
      t.false(error || stderr, 'returns no error')
      const result = JSON.parse(stdout)
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      t.end()
    })
})

test(`CLI
  should error export slack im history`, (t) => {
  const fileObj = tmp.fileSync()
  exec(`${binPath} -t ${SLACK_API_TOKEN} -u Invalid -f ${fileObj.name}`,
    (error, stdout, stderr) => {
      t.false(error, 'No system or programmer\'s error')
      t.ok(
        // eslint-disable-next-line no-bitwise
        ~stderr.indexOf('Username is invalid, please check and try again'),
        'Invalid username error is returned'
      )
      fileObj.removeCallback()
      t.end()
    })
})

test(`CLI
  should export slack im history to a file`, (t) => {
  const fileObj = tmp.fileSync()
  exec(`${binPath} -t ${SLACK_API_TOKEN} -u slackbot -f ${fileObj.name}`,
    (error) => {
      t.false(error, 'No system or programmer\'s error')
      const result = JSON.parse(fs.readFileSync(fileObj.name))
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      fileObj.removeCallback()
      t.end()
    })
})

test(`CLI
  should export slack group history`, (t) => {
  exec(`${binPath} -t ${SLACK_API_TOKEN} -g store`,
    (error, stdout, stderr) => {
      t.false(error || stderr, 'returns no error')
      const result = JSON.parse(stdout)
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      t.end()
    })
})

test(`CLI
  should export slack channel history`, (t) => {
  exec(`${binPath} -t ${SLACK_API_TOKEN} -c general`,
    (error, stdout, stderr) => {
      t.false(error || stderr, 'returns no error')
      const result = JSON.parse(stdout)
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      t.end()
    })
})
