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
    .option('fingerprint', {
      alias: 'f',
      describe: 'Send public SSH fingerprint',
      demand: false,
      type: 'string'
    })
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  const { host, user, fingerprint, json } = argv;
  try {
    const authorized_keys = await get(
      `/authorized_keys/${host}/${user}${fingerprint ? `?f=${fingerprint}` : ''}`,
      json ? { Accept: 'application/json' } : undefined
    );
    if (json) {
      outputJson(authorized_keys);
    } else {
      console.log(authorized_keys);
    }
  } catch (e) {
    outputError(err).catch(() => {});
  }
};
