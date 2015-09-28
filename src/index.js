#! /usr/bin/env node
'use strict';

import {processIM} from './commons.js';
import jsonfile from 'jsonfile';
import csv from 'fast-csv';
import PleasantProgress from 'pleasant-progress';
jsonfile.spaces = 4;
export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  progress.start('working');
  if(args.username) {
    processIM(args.token, args.username).then(history => {
      let currentDir = args.directory || process.cwd();
      let filePath = (args.filename) ? `${currentDir}/${args.filename}.json` : `${currentDir}/${Date.now()}-${args.username}-slack-history`;
      if (args.format === 'csv') {
        csv.writeToPath(`${filePath}.csv`, history, {
          headers: true,
          transform: (row) => {
            return {
              Date: row.date,
              User: row.user,
              Message: row.text
            };
          }
        }).on('finish', () => {
          progress.stop();
          console.log(`Done! file saved at ${filePath}.csv`);
        });
      } else {
        jsonfile.writeFile(`${filePath}.json`, history, function(err) {
          if (!err) {
            progress.stop();
            console.log(`Done! file saved at ${filePath}.json`);
          } else {
            throw err;
          }
        });
      }
    }).catch(error => {
      console.log(error.stack);
      progress.stop();
      process.exit(1);
    });
  }
}
