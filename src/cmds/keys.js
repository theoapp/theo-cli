import { checkEnv } from '../libs/appUtils';

exports.command = 'keys <command>';
exports.desc = 'Manage accounts keys';
exports.builder = function(yargs) {
  checkEnv();
  return yargs.commandDir('keys_cmds');
};
exports.handler = function(argv) {};
