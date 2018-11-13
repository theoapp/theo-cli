import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'search [options]';
exports.desc = 'Check accounts by permissions';
exports.builder = yargs => {
  return yargs
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
    const authorized_keys = await get('/permissions/' + argv.host + '/' + argv.user, { Accept: 'application/json' });
    outputJson(authorized_keys);
  } catch (err) {
    outputError(err);
  }
};
