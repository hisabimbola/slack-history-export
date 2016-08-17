#! /usr/bin/env node
'use strict';

import {processIM, processChannel, processGroup} from './commons.js';
import PleasantProgress from 'pleasant-progress';

export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  progress.start('working');
  if(args.type === 'dm' || args.username) {
    processIM(args).then(result => {
      progress.stop();
      console.log(`Done exporting history: file saved at ${result.path}`);
    }).catch(error => {
      console.error(error);
      progress.stop();
    });
  } else if (args.type === 'channel' || args.channel) {
    processChannel(args).then(result => {
      progress.stop();
      console.log(`Done exporting history: file saved at ${result.path}`);
    }).catch((error) => {
      progress.stop();
      console.error(error);
    });
  } else if (args.type === 'group' || args.group) {
    processGroup(args).then(result => {
      progress.stop();
      console.log(`Done exporting history: file saved at ${result.path}`);
    }).catch((error) => {
      progress.stop();
      console.error(error);
    });
  }
}
