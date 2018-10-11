exports.command = 'keys <command>';
exports.desc = "Manage accounts' keys";
exports.builder = function(yargs) {
  return yargs.commandDir('keys_cmds');
};
exports.handler = function(argv) {};
