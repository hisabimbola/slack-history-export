import { exec } from 'child_process'
import test from 'tape'

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
    t.false(error && stderr, 'returns no error')
    t.end()
  })
})

test(`CLI
  version flag`, (t) => {
  exec(`${binPath} --version`, (error, stdout, stderr) => {
    t.equal(stdout, `${version}\n`, 'outputs current version number')
    t.false(error && stderr, 'returns no error')
    t.end()
  })
})

test(`CLI
  should export slack im history`, (t) => {
  exec(`${binPath} -t ${SLACK_API_TOKEN} -u slackbot`,
    (error, stdout, stderr) => {
      t.false(error && stderr, 'returns no error')
      const result = JSON.parse(stdout)
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      t.end()
    })
})

test(`CLI
  should export slack group history`, (t) => {
  exec(`${binPath} -t ${SLACK_API_TOKEN} -g store`,
    (error, stdout, stderr) => {
      t.false(error && stderr, 'returns no error')
      const result = JSON.parse(stdout)
      t.ok(result, 'slack history is exported')
      t.ok(result.length > 0, 'Slack history array is not empty')
      t.end()
    })
})
