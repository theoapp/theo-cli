import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'add <account> [options]';
exports.desc = 'Add key to account';
exports.builder = yargs => {
  return yargs
    .option('key', {
      alias: 'k',
      describe: 'Public ssh key'
    })
    .demandOption(['key']);
};
exports.handler = async argv => {
  try {
    const payload = {};
    if (argv.key) {
      if (typeof argv.key === 'string') {
        payload.keys = [argv.key];
      } else {
        payload.keys = argv.key;
      }
    }
    const account = await post('/accounts/' + argv.account + '/keys', payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
