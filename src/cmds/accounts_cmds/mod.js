import { put } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'mod <id> [options]';
exports.desc = 'Change account status';
exports.builder = yargs => {
  return yargs
    .option('enable', {
      alias: 'e',
      describe: 'Enable Account',
      boolean: true
    })
    .option('disable', {
      alias: 'd',
      describe: 'Disable Account',
      boolean: true
    })
    .option('expire', {
      alias: 'x',
      describe: 'Set account expiration (0 no expire). Use ISO 8601 date format (ex 2018-10-31)',
      type: 'string'
    });
};
exports.handler = async argv => {
  try {
    if (argv.enable && argv.disable) {
      console.error('Only one between --enable and --disable must be used');
      return;
    }
    const payload = {};
    if (argv.enable || argv.disable) {
      payload['active'] = argv.enable || false;
    }
    if (argv.expire !== undefined) {
      if (argv.expire === '0') {
        payload['expire_at'] = 0;
      } else {
        payload['expire_at'] = argv.expire;
      }
    }
    if (Object.keys(payload).length === 0) {
      console.error('Nothing to do...');
      return;
    }
    const account = await put('/accounts/' + argv.id, payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
