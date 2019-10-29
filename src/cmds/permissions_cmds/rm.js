import { del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'rm [options]';
exports.desc = 'Remove permission from account or group';
exports.builder = yargs => {
  return yargs
    .option('account', {
      alias: 'a',
      describe: 'Account id',
      type: 'string'
    })
    .option('group', {
      alias: 'g',
      describe: 'Group id',
      type: 'string'
    })
    .option('permission', {
      alias: 'p',
      describe: 'Permission ID'
    })
    .demandOption(['permission']);
};
exports.handler = async argv => {
  try {
    const { account, group, permission } = argv;
    const permissionId = Number(permission);
    let url;
    if (account) {
      url = '/accounts/' + account + '/permissions/' + permissionId;
    } else if (group) {
      url = '/groups/' + group + '/permissions/' + permissionId;
    } else {
      console.error('One from account or group must be set');
      process.exit(2);
    }
    const ret = await del(url);
    outputJson(ret);
  } catch (err) {
    await outputError(err);
  }
};
