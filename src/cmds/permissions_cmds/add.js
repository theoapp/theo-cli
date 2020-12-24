import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'add [options]';
exports.desc = 'Add permission to account or group';
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
    .option('host', {
      alias: 'h',
      describe: 'Host name',
      demand: true,
      type: 'string'
    })
    .option('user', {
      alias: 'u',
      describe: 'User name',
      demand: true,
      type: 'string'
    })
    .option('ssh-options', {
      alias: 's',
      describe: 'SSH options',
      demand: false,
      type: 'string'
    })
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  try {
    const { account, group, user, host, sshOptions } = argv;
    let url;
    if (account) {
      url = '/accounts/' + account + '/permissions';
    } else if (group) {
      url = '/groups/' + group + '/permissions';
    } else {
      console.error('One from account or group must be set');
      process.exit(2);
    }
    const payload = {
      user,
      host
    };
    if (sshOptions) {
      try {
        payload.ssh_options = JSON.parse(sshOptions);
      } catch (e) {
        console.error('Invalid ssh_options, it must be valid JSON');
        process.exit(2);
      }
    }
    const ret = await post(url, payload);
    outputJson(ret);
  } catch (err) {
    await outputError(err);
  }
};
