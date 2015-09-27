'use strict';

let program = require('commander');
import {slackHistoryExport} from './index.js';
program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-t, --token <value>', '[REQUIRED] Enter your slack token API, you can generate it from here https://api.slack.com/web')
  .option('-u, --username [value]', 'Enter username to download history')
  .parse(process.argv);

if (!program.token) {
  throw new Error('Slack Token must be present type "slack-history-export --help to view options"');
}

slackHistoryExport(program);
