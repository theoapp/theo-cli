import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'list';
exports.desc = 'List accounts';
exports.builder = yargs => {
  return yargs
    .option('limit', {
      alias: 'l',
      describe: 'Number of accounts to retrieve',
      type: 'number'
    })
    .option('offset', {
      alias: 'o',
      describe: 'Offset of the query',
      type: 'number'
    });
};
exports.handler = async argv => {
  try {
    const { limit, offset } = argv;
    let query = '';
    if (limit && offset) {
      query = `?limit=${limit}&offset=${offset}`;
    } else if (limit) {
      query = `?limit=${limit}`;
    } else if (offset) {
      query = `?offset=${offset}`;
    }
    const accounts = await get('/accounts' + query);
    outputJson(accounts);
  } catch (err) {
    outputError(err);
  }
};
