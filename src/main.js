#!/usr/bin/env node
import fs from 'fs';
import dotenv from 'dotenv';
import os from 'os';
/*
  We search for environment file :
  $PWD/.env
  $HOME/.theo-cli/env
  /etc/theo-cli/env
 */
const options = {};
if (!fs.existsSync('.env')) {
  const userEnv = os.homedir() + '/.theo/env';
  if (fs.existsSync(userEnv)) {
    options.path = userEnv;
  } else {
    const globalEnv = '/etc/theo/env';
    if (fs.existsSync(globalEnv)) {
      options.path = globalEnv;
    }
  }
}

dotenv.config(options);

if (!process.env.THEO_URL || !process.env.THEO_TOKEN) {
  console.error('Please set THEO_URL and THEO_TOKEN in your environment');
  process.exit(1);
}

const argv = require('yargs')
  .commandDir('cmds')
  .demandCommand()
  .help().argv;
