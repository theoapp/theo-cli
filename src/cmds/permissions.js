exports.command = 'permissions <command>';
exports.desc = "Manage accounts' permissions";
exports.builder = function(yargs) {
  return yargs.commandDir('permissions_cmds');
};
exports.handler = function(argv) {};
