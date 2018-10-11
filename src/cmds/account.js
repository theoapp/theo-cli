exports.command = 'accounts <command>';
exports.desc = 'Manage accounts';
exports.builder = function(yargs) {
  return yargs.commandDir('accounts_cmds');
};
exports.handler = function(argv) {};
