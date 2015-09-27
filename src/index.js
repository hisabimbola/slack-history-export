#! /usr/bin/env node
'use strict';

import {processIM} from './commons.js';
import jsonfile from 'jsonfile';
import PleasantProgress from 'pleasant-progress';
jsonfile.spaces = 4;
export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  progress.start('working');
  if(args.username) {
    processIM(args.token, args.username).then(history => {
      let currentDir = args.directory || process.cwd();
      let filePath = (args.filename) ? `${currentDir}/${args.filename}.json` : `${currentDir}/${Date.now()}-${args.username}-slack-history.json`;
      jsonfile.writeFile(filePath, history, function(err) {
        if (!err) {
          progress.stop();
          console.log(`Done! file saved at ${filePath}`);
        } else {
          throw err;
        }
      });
    }).catch(error => {
      console.log('error', error);
      progress.stop();
      process.exit(1);
    });
  }
}
