import { get } from '../../libs/httpUtils';
import { buildTable, outputError, outputJson, outputVerticalTable } from '../../libs/stringUtils';
import { renderSSHOptions } from '../../libs/sshOptionsUtils';

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
              return {
                id: d.id,
                fingerprint: d.fingerprint,
                signed: !!d.public_key_sig,
                'SSH options': d.ssh_options ? renderSSHOptions(d.ssh_options) : '',
                last_used_at: d.last_used_at,
                created_at: d.created_at
              };
            })
          );
        },
        permissions: function(data) {
          return buildTable(
            data.map(d => {
              return {
                id: d.id,
                user: d.user,
                host: d.host,
                'SSH options': d.ssh_options ? renderSSHOptions(d.ssh_options) : '',
                from_group: d.from_group ? d.from_group.name : '',
                created_at: d.created_at
              };
            })
          );
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
