import { checkEnv } from '../libs/appUtils';

exports.command = 'groups <command>';
exports.desc = 'Manage groups';
exports.builder = function(yargs) {
  checkEnv();
  return yargs.commandDir('groups_cmds');
};
exports.handler = function(argv) {};
