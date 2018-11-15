import { get } from '../libs/httpUtils';
import { outputError } from '../libs/stringUtils';

exports.command = 'exp';
exports.desc = 'Export db';
exports.builder = yargs => {
  return yargs.option('pretty', {
    alias: 'p',
    describe: 'Pretty print dump',
    demand: false,
    boolean: true
  });
};
exports.handler = async argv => {
  try {
    const dump = await get('/impexp', { Accept: 'application/json' });
    console.log(JSON.stringify(dump, null, argv.pretty ? 3 : 0));
  } catch (err) {
    outputError(err);
  }
};
