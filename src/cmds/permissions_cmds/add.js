import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'add [options]';
exports.desc = 'Add permission to account or group';
exports.builder = yargs => {
  return yargs
    .option('account', {
      alias: 'a',
      describe: 'Account id',
      type: 'number'
    })
    .option('group', {
      alias: 'g',
      describe: 'Group id',
      type: 'number'
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
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  try {
    const { account, group, user, host } = argv;
    const payload = {
      user,
      host
    };
    let url;
    if (account) {
      url = '/accounts/' + account + '/permissions';
    } else if (group) {
      url = '/groups/' + group + '/permissions';
    } else {
      console.error('One from account or group must be set');
      process.exit(2);
    }
    const ret = await post(url, payload);
    outputJson(ret);
  } catch (err) {
    outputError(err);
  }
};
