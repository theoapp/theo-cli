import { get } from '../../libs/httpUtils';
import { outputError, outputJson, outputPaginableTable } from '../../libs/stringUtils';

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
    })
    .option('format', {
      alias: 'f',
      describe: 'Format (json/table)',
      type: 'string'
    });
};
exports.handler = async argv => {
  try {
    const { limit, offset } = argv;
    const format = process.env.FORMAT || argv.format;
    let query = '';
    if (limit && offset) {
      query = `?limit=${limit}&offset=${offset}`;
    } else if (limit) {
      query = `?limit=${limit}`;
    } else if (offset) {
      query = `?offset=${offset}`;
    }
    const groups = await get('/groups' + query);
    if (format && format === 'json') {
      outputJson(groups);
    } else {
      outputPaginableTable(groups);
    }
  } catch (err) {
    await outputError(err);
  }
};
