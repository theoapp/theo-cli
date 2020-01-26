import { get } from '../../libs/httpUtils';
import { outputError, outputJson, outputTable } from '../../libs/stringUtils';

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
    .option('format', {
      alias: 'f',
      describe: 'Format (json/table)',
      type: 'string'
    })
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  const format = process.env.FORMAT || argv.format;
  try {
    const authorized_keys = await get('/permissions/' + argv.host + '/' + argv.user, { Accept: 'application/json' });
    if (format && format === 'json') {
      outputJson(authorized_keys);
    } else {
      outputTable(authorized_keys);
    }
  } catch (err) {
    outputError(err);
  }
};
