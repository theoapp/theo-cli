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
    .demandOption(['name', 'email']);
};
exports.handler = async argv => {
  try {
    const { email, name } = argv;
    if (!email || !name) {
      console.error('email and name are required');
      return;
    }
    const account = await post('/accounts', { email, name });
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
