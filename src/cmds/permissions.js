import { checkEnv } from '../libs/appUtils';

exports.command = 'permissions <command>';
exports.desc = 'Manage accounts and groups permissions';
exports.builder = function(yargs) {
  checkEnv();
  return yargs.commandDir('permissions_cmds');
};
exports.handler = function(argv) {};
