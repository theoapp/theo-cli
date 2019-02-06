import { get } from '../libs/httpUtils';
import { outputError, outputJson } from '../libs/stringUtils';
import { checkEnv } from '../libs/appUtils';

exports.command = 'authorized_keys [options]';
exports.desc = 'Test authorized_keys';
exports.builder = yargs => {
  checkEnv();
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
    .option('json', {
      alias: 'j',
      describe: 'Return json array',
      demand: false,
      boolean: true
    })
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  try {
    const authorized_keys = await get(
      '/authorized_keys/' + argv.host + '/' + argv.user,
      argv.json ? { Accept: 'application/json' } : undefined
    );
    if (argv.json) {
      outputJson(authorized_keys);
    } else {
      console.log(authorized_keys);
    }
  } catch (err) {
    outputError(err);
  }
};
