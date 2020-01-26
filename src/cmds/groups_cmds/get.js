import { get } from '../../libs/httpUtils';
import { buildTable, outputError, outputJson, outputVerticalTable } from '../../libs/stringUtils';

exports.command = 'get <id>';
exports.desc = 'Get group';

exports.builder = yargs => {
  return yargs.option('format', {
    alias: 'f',
    describe: 'Format (json/table)',
    type: 'string'
  });
};

exports.handler = async argv => {
  const format = process.env.FORMAT || argv.format;
  try {
    const group = await get('/groups/' + argv.id);
    if (format && format === 'json') {
      outputJson(group);
    } else {
      outputVerticalTable(group, {
        permissions: function(data) {
          return buildTable(data);
        },
        accounts: function(data) {
          return buildTable(data);
        }
      });
    }
  } catch (err) {
    outputError(err);
  }
};
