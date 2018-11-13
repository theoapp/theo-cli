import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'add [options]';
exports.desc = 'Create account';
exports.builder = yargs => {
  return yargs
    .option('name', {
      alias: 'n',
      describe: 'Account name',
      demand: true,
      type: 'string'
    })
    .option('email', {
      alias: 'e',
      describe: 'Account email',
      demand: true,
      type: 'string'
    })
    .option('expire', {
      alias: 'x',
      describe: 'Set account expiration (0 no expire). Use ISO 8601 date format (ex 2018-10-31)',
      type: 'string'
    })
    .demandOption(['name', 'email']);
};
exports.handler = async argv => {
  try {
    const { email, name } = argv;
    if (!email || !name) {
      console.error('email and name are required');
      return;
    }
    const payload = {
      email,
      name
    };
    if (argv.expire !== undefined) {
      if (argv.expire === '0') {
        payload['expire_at'] = 0;
      } else {
        payload['expire_at'] = argv.expire;
      }
    }
    const account = await post('/accounts', payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
