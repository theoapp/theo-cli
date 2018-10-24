import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'list';
exports.desc = 'List groups';
exports.builder = yargs => {
  return yargs
    .option('limit', {
      alias: 'l',
      describe: 'Number of groups to retrieve',
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
    const accounts = await get('/groups' + query);
    outputJson(accounts);
  } catch (err) {
    outputError(err);
  }
};
