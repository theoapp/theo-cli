import { del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'rm <account> [options]';
exports.desc = 'Remove key from account';
exports.builder = yargs => {
  return yargs
    .option('key', {
      alias: 'k',
      describe: 'Public ssh key ID'
    })
    .demandOption(['key']);
};
exports.handler = async argv => {
  try {
    const keyId = Number(argv.key);
    const account = await del('/accounts/' + argv.account + '/keys/' + keyId);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
