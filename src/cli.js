'use strict';

import program from 'commander';
import updateNotifier from 'update-notifier';
import pkg from './../package.json';
import {slackHistoryExport} from './index.js';
program
  .version('0.1.1')
  .usage('[options]')
  .option('-t, --token <value>', '[REQUIRED] Enter your slack token API, you can generate it from here https://api.slack.com/web')
  .option('-u, --username [value]', 'Enter username of the person whose chat history with you you will like to download')
  .option('-d, --directory [value]', 'Directory to save generated file')
  .option('-f, --filename [value]', 'Name of generated file. Default is "<current timestamp><username || channel || group>-slack-history" e.g \'1443378584156-abimbola-slack-history.json\'')
  .option('-F, --format [value]', 'Format you want to download the data, supported format is [csv, json], default is \'json\'')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}

if (!program.token) {
  throw new Error('Slack Token must be present type "slack-history-export --help to view options"');
}

//checks for update and notify the user
updateNotifier({pkg: pkg}).notify();

slackHistoryExport(program);
