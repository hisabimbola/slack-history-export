#! /usr/bin/env node
'use strict';

import {processIM, processChannel, processGroup} from './commons.js';
import PleasantProgress from 'pleasant-progress';

export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  if(args.type === 'dm' || args.username) {
    progress.start('working');
    processIM(args).then(result => {
      progress.stop();
      if (result.length) {
        console.log(`Done exporting history: files saved at ${result[0].path}`);
      } else {
        console.log(`Done exporting history: file saved at ${result.path}`);
      }
    }).catch(error => {
      console.error(error);
      progress.stop();
    });
  } else if (args.type === 'channel' || args.channel) {
    progress.start('working');
    processChannel(args).then(result => {
      progress.stop();
      if (result.length) {
        console.log(`Done exporting history: files saved at ${result[0].dir}`);
      } else {
        console.log(`Done exporting history: file saved at ${result.path}`);
      }
    }).catch((error) => {
      progress.stop();
      console.error(error);
    });
  } else if (args.type === 'group' || args.group) {
    progress.start('working');
    processGroup(args).then(result => {
      progress.stop();
      if (result.length) {
        console.log(`Done exporting history: files saved at ${result[0].path}`);
      } else {
        console.log(`Done exporting history: file saved at ${result.path}`);
      }
    }).catch((error) => {
      progress.stop();
      console.error(error);
    });
  } else {
    console.log('Error: Unknown argument format. Use "slack-history-export --help" to know valid options/arguments');
    process.exit(1);
  }
}
