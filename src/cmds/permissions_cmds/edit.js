import { put } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'edit [options]';
exports.desc = 'Edit permission for account or group';
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
    .option('ssh-options', {
      alias: 's',
      describe: 'SSH options',
      demand: false,
      type: 'string'
    })
    .demandOption(['permission', ['ssh-options']]);
};
exports.handler = async argv => {
  try {
    const { account, group, permission, sshOptions } = argv;
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
    let ssh_options;
    try {
      ssh_options = JSON.parse(sshOptions);
    } catch (e) {
      console.error('Invalid ssh_options, it must be valid JSON');
      process.exit(2);
    }
    const ret = await put(url, { ssh_options });
    outputJson(ret);
  } catch (err) {
    await outputError(err);
  }
};
