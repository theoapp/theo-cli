import { put } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'mod <id> [options]';
exports.desc = 'Change group status';
exports.builder = yargs => {
  return yargs
    .option('action', {
      alias: 'a',
      describe: 'Action: enable|disable',
      type: 'string',
      demand: true
    })
    .demandOption(['action']);
};
exports.handler = async argv => {
  try {
    const { action } = argv;
    let active = 0;
    if (action === 'enable') {
      active = 1;
    } else if (action !== 'disable') {
      console.error('action must be enable or disable');
      process.exit(1);
    }
    const payload = { active };
    const account = await put('/groups/' + argv.id, payload);
    outputJson(account);
  } catch (err) {
    outputError(err).catch(err => console.error('Failed to retreive error', err));
  }
};
