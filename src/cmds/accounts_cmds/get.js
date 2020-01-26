import { get } from '../../libs/httpUtils';
import { buildTable, outputError, outputJson, outputVerticalTable } from '../../libs/stringUtils';

exports.command = 'get <id>';
exports.desc = 'Get account';
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
    const account = await get('/accounts/' + argv.id);
    if (format && format === 'json') {
      outputJson(account);
    } else {
      outputVerticalTable(account, {
        public_keys: function(data) {
          return buildTable(
            data.map(d => {
              return { id: d.id, fingerprint: d.fingerprint, created_at: d.created_at, signed: !!d.public_key_sig };
            })
          );
        },
        permissions: function(data) {
          return buildTable(data);
        },
        groups: function(data) {
          return buildTable(data);
        }
      });
    }
  } catch (err) {
    outputError(err);
  }
};
