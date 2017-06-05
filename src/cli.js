import yargs from 'yargs'
import fs from 'fs'
import log from 'npmlog'
import SlackHistoryExport from './main'
import { fetchToken } from './utils'

import { version } from '../package.json'

process.title = 'slack-history-export'

log._error = log.error
log.error = customErrorHandler
log.enableColor()

const args = yargs
  .usage(
    `\n
Usage: $0 [options]
Download message history from slack`
  )
  .showHelpOnFail(true)

  .option('help', {
    alias: 'h',
  })
  .help('help', 'Show help text.')

  .option('version', {
    alias: 'v',
    type: 'boolean',
  })
  .version('version', 'Show version number.', () => version)
  .option('token', {
    alias: 't',
    describe: `Slack Token. You can generate it
    from here https://api.slack.com/web`,
  })
  .option('type', {
    alias: 'T',
    describe: 'Type of export you want to do',
    choices: ['dm', 'group'],
  })
  .option('username', {
    alias: 'u',
    describe: `Username of the person who chat
    history with you you want to download`,
  })
  .option('group', {
    alias: 'g',
    describe: 'Name of the group to download history',
  })
  .option('logLevel', {
    alias: 'l',
    default: 'info',
    describe: 'Enable and set log level',
    choices: ['info', 'silly', 'verbose', 'warn', 'error'],
    coerce: (level) => {
      log.level = level
      return level
    },
  })
  .option('channel', {
    alias: 'c',
    describe: 'Name of the channel to download history',
  })
  .option('filepath', {
    alias: 'f',
    default: 'stdout',
    describe: 'Path to the json file to save the history',
  })
  .coerce('filepath', (arg) => {
    if (arg !== 'stdout')
      return fs.createWriteStream(String(arg))

    // No output file given, log to file to not disturb stdout/stderr
    log.stream = fs.createWriteStream('slack-history-export.log')

    return process.stdout
  })
  .argv


args.token = args.t = fetchToken(args.token)

const slackHistoryExport = new SlackHistoryExport(args, log)

function customErrorHandler (...params) {
  console.error(...params)
  log._error(...params)
}

process.on('exit', () => {
  log.disableProgress()
})
const successCallback = function successCallback () {
  log.info('', 'History successfully exported')
}

const errorCallback = function errorCallback (error) {
  log.error('Error:', error)
}

if (args.username)
  slackHistoryExport.processIMs(args.filepath)
    .then(successCallback)
    .catch(errorCallback)
else if (args.group)
  slackHistoryExport.processGroups(args.filepath)
    .then(successCallback)
    .catch(errorCallback)
else if (args.channel)
  slackHistoryExport.processChannels(args.filepath)
    .then(successCallback)
    .catch(errorCallback)
else
  log.error('Error:', 'Export type not suppported')

