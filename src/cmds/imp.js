import fs from 'fs';
import { post } from '../libs/httpUtils';
import { outputError } from '../libs/stringUtils';
import { checkEnv } from '../libs/appUtils';

exports.command = 'imp';
exports.desc = 'Import from dump';
exports.builder = yargs => {
  checkEnv();
  return yargs.option('dump', {
    alias: 'd',
    describe: 'Path to dump',
    demand: true,
    type: 'string'
  });
};
exports.handler = async argv => {
  try {
    const dump = fs.readFileSync(argv.dump, 'utf-8');
    await post('/impexp', dump);
  } catch (err) {
    outputError(err);
  }
};
