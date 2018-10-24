import { get } from '../libs/httpUtils';
import { outputError } from '../libs/stringUtils';

exports.command = 'authorized_keys [options]';
exports.desc = 'Test authorized_keys';
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
    const authorized_keys = await get('/authorized_keys/' + argv.host + '/' + argv.user);
    console.log(authorized_keys);
  } catch (err) {
    outputError(err);
  }
};
