import { post, del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'edit <id> [options] <group>';
exports.desc = 'Edit account';
exports.builder = yargs => {
  return yargs
    .option('add', {
      alias: 'a',
      describe: 'Add account to group',
      boolean: true
    })
    .option('rm', {
      alias: 'd',
      describe: 'Remove account from group',
      boolean: true
    });
};
exports.handler = async argv => {
  try {
    const { add, rm, id, group } = argv;
    if (!add && !rm) {
      console.error('One from --add and --rm is required');
      process.exit(1);
    }
    if (add && rm) {
      console.error('only one between --add or --rm is admitted');
      process.exit(1);
    }
    let ret;
    if (add) {
      ret = await post('/groups/' + group, { id });
    } else {
      ret = await del('/groups/' + group + '/' + id);
    }
    outputJson(ret);
  } catch (err) {
    outputError(err);
  }
};
