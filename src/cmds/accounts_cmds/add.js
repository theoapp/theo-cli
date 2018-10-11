import { post } from '../../libs/httpUtils';

exports.command = 'add [options]';
exports.desc = 'Create account';
exports.builder = yargs => {
  return yargs
    .option('name', {
      alias: 'n',
      describe: 'Account name'
    })
    .option('email', {
      alias: 'e',
      describe: 'Account email'
    })
    .option('key', {
      alias: 'k',
      describe: 'Account public key (accept multiple key)'
    })
    .demandOption(['name', 'email']);
};
exports.handler = async argv => {
  try {
    const { email, name } = argv;
    const payload = { email, name };
    if (argv.key) {
      if (typeof argv.key === 'string') {
        payload.keys = [argv.key];
      } else {
        payload.keys = argv.key;
      }
    }
    const account = await post('/accounts', payload);
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
