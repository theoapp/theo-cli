import { del } from '../../libs/httpUtils';

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
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
