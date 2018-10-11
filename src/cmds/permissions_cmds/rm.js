import { del } from '../../libs/httpUtils';

exports.command = 'rm <account> [options]';
exports.desc = 'Remove permission from account';
exports.builder = yargs => {
  return yargs
    .option('permission', {
      alias: 'p',
      describe: 'Permission ID'
    })
    .demandOption(['permission']);
};
exports.handler = async argv => {
  try {
    const permissionId = Number(argv.permission);
    const ret = await del('/accounts/' + argv.account + '/permissions/' + permissionId);
    console.log('+---------------------------+');
    console.log(JSON.stringify(ret, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
