import { del, post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'edit <id> [options] <account..>';
exports.desc = 'Add/remove account(s) to/from group';
exports.builder = yargs => {
  return yargs
    .option('add', {
      alias: 'a',
      describe: 'Add accounts to group',
      boolean: true
    })
    .option('rm', {
      alias: 'd',
      describe: 'Remove accounts from group',
      boolean: true
    });
};
exports.handler = async argv => {
  try {
    const { add, rm, id, account } = argv;
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
      if (typeof account === 'string') {
        ret = await post('/groups/' + id, { id: account });
      } else {
        ret = await post('/groups/' + id, { ids: account });
      }
    } else {
      if (typeof account === 'string') {
        ret = await del('/groups/' + id + '/' + account);
      } else {
        ret = [];
        for (let i = 0; i < account.length; i++) {
          const r = await del('/groups/' + id + '/' + account[i]);
          ret.push(r);
        }
      }
    }

    outputJson(ret);
  } catch (err) {
    outputError(err).catch(err => console.error('Failed to retreive error', err));
  }
};
