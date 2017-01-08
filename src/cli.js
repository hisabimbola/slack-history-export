import yargs from 'yargs'
import fs from 'fs'
import SlackHistoryExport from './main'

import { version } from '../package.json'

process.title = 'slack-history-export'

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
    demand: true,
  })
  .option('type', {
    alias: 'T',
    describe: 'Type of export you want to do',
    choices: ['dm'],
  })
  .option('username', {
    alias: 'u',
    describe: `Username of the person who chat
    history with you you want to download`,
  })
  .option('filepath', {
    alias: 'f',
    default: 'stdout',
    describe: 'Path to the json file to save the history',
  })
  .coerce('filepath', (arg) => {
    if (arg !== 'stdout')
      return fs.createWriteStream(String(arg))

    return process.stdout
  })
  .option('debug', {
    alias: 'd',
    describe: 'Switch to debug mode',
  })
  .argv


const slackHistoryExport = new SlackHistoryExport(args)

if (args.username)
  slackHistoryExport.processIMs(args.filepath)
