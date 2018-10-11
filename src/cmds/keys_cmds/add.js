import { post } from '../../libs/httpUtils';

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
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
