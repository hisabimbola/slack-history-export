#! /usr/bin/env node

/* eslint-disable */
/*
  This file exists because we use Babel to transpile the JS but when testing
  the CLI we need to spawn a process that uses normal JS.
*/
'use strict';

require('../lib/cli.js');
