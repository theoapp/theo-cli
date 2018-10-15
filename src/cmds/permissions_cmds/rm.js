import { del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

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
    outputJson(ret);
  } catch (err) {
    outputError(err);
  }
};
