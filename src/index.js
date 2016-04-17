#! /usr/bin/env node
'use strict';

import {processIM, processChannel, saveData} from './commons.js';
import PleasantProgress from 'pleasant-progress';

export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  progress.start('working');
  if(args.type === 'dm') {
    processIM(args.token, args.username).then(history => {
      saveData(history,args,progress,args.filename);
    }).catch(error => {
      console.log(error.stack);
      progress.stop();
      process.exit(1);
    });
  } else if (args.type === 'channel') {
    processChannel(args.token, args.channel).then(history => {
      saveData(history,args, progress,args.channel);
    }).catch((error) => {
      progress.stop();
      console.log(error);
      console.log(error.stack);
    });
  }
}
