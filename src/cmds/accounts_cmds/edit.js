import { put } from '../../libs/httpUtils';

exports.command = 'edit <id> [options]';
exports.desc = 'Edit account';
exports.builder = yargs => {
  return yargs
    .option('enable', {
      alias: 'e',
      describe: 'Enable Account',
      boolean: true
    })
    .option('disable', {
      alias: 'd',
      describe: 'Disable Account',
      boolean: true
    });
};
exports.handler = async argv => {
  try {
    if ((argv.enable && argv.disable) || (!argv.enable && !argv.disable)) {
      console.error('WTF?');
      return;
    }
    const payload = { active: argv.enable };
    const account = await put('/accounts/' + argv.id, payload);
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
