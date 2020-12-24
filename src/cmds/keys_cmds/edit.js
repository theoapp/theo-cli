import { put } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'edit <account> [options]';
exports.desc = "Update SSH options for an account's key";
exports.builder = yargs => {
  return yargs
    .option('key', {
      alias: 'k',
      describe: 'Public ssh key ID'
    })
    .option('ssh-options', {
      alias: 'o',
      describe: 'SSH options',
      demand: true,
      type: 'string'
    })
    .demandOption(['key', 'ssh-options']);
};
exports.handler = async argv => {
  const { key, sshOptions, account } = argv;
  try {
    const keyId = Number(key);
    const payload = {};
    if (sshOptions) {
      payload.ssh_options = JSON.parse(sshOptions);
    } else {
      payload.ssh_options = {};
    }
    const keysRet = await put('/accounts/' + account + '/keys/' + keyId, payload);
    outputJson(keysRet);
  } catch (err) {
    await outputError(err);
  }
};
