require('dotenv').config();
const argv = require('yargs')
  .commandDir('cmds')
  .demandCommand()
  .help().argv;
