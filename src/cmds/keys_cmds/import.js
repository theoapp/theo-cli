import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'import <account> [options]';
exports.desc = 'Imporrt keys to account from a service (github/gitlab)';
exports.builder = yargs => {
  return yargs
    .option('service', {
      alias: 's',
      demand: true,
      type: 'string',
      describe: 'Service to import from'
    })
    .option('username', {
      alias: 'u',
      describe: "Service's username",
      demand: true,
      type: 'string'
    })
    .demandOption(['service', 'username']);
};
exports.handler = async argv => {
  try {
    const payload = {
      username: argv.username
    };
    const path = '/accounts/' + argv.account + '/keys/import/' + argv.service;
    const account = await post(path, payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
