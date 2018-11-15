import fs from 'fs';
import { post } from '../libs/httpUtils';
import { outputError } from '../libs/stringUtils';

exports.command = 'imp';
exports.desc = 'Import from dump';
exports.builder = yargs => {
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
