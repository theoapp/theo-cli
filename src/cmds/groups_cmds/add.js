import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'add [options]';
exports.desc = 'Create group';
exports.builder = yargs => {
  return yargs
    .option('name', {
      alias: 'n',
      describe: 'Group name',
      demand: true,
      type: 'string'
    })
    .demandOption(['name']);
};
exports.handler = async argv => {
  try {
    const { name } = argv;
    if (!name) {
      console.error('name is required');
      return;
    }
    const payload = { name };
    const groups = await post('/groups', payload);
    outputJson(groups);
  } catch (err) {
    outputError(err);
  }
};
