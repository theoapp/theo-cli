import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'search';
exports.desc = 'Search accounts';
exports.builder = yargs => {
  return yargs
    .option('name', {
      alias: 'n',
      describe: 'Account name',
      type: 'string'
    })
    .option('email', {
      alias: 'e',
      describe: 'Account email',
      type: 'string'
    })
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
    const { name, email, limit, offset } = argv;
    const query = {};
    if (limit) {
      query.limit = limit;
    }
    if (offset) {
      query.offset = offset;
    }
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    const squery =
      Object.keys(query).length > 0
        ? '?' +
          Object.keys(query)
            .map(k => k + '=' + query[k])
            .join('&')
        : '';
    if (squery === '') {
      throw new Error('--name or --email must be used');
    }
    const accounts = await get('/accounts/search' + squery);
    outputJson(accounts);
  } catch (err) {
    outputError(err);
  }
};
