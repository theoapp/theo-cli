import { checkEnv } from '../libs/appUtils';

exports.command = 'accounts <command>';
exports.desc = 'Manage accounts';
exports.builder = function(yargs) {
  checkEnv();
  return yargs.commandDir('accounts_cmds');
};
exports.handler = function(argv) {};
