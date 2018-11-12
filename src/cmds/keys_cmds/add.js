import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';
import { readFile } from '../../libs/fileUtils';
import Signer from '../../libs/rsaUtils';

exports.command = 'add <account> [options]';
exports.desc = 'Add key to account';
exports.builder = yargs => {
  return yargs
    .option('key', {
      alias: 'k',
      describe: 'Public ssh key',
      type: 'string',
      demand: true
    })
    .option('sign', {
      alias: 's',
      describe:
        'sign Public ssh key with private key. (Needs THEO_PRIVATE_KEY and THEO_PRIVATE_KEY_PASSPHRASE env variable)',
      boolean: true
    })
    .demandOption(['key']);
};

exports.handler = async argv => {
  try {
    const payload = {};
    let private_key;
    let passphrase;
    if (argv.sign) {
      if (!process.env.THEO_PRIVATE_KEY) {
        const e = new Error('Asked to sign but no THEO_PRIVATE_KEY provided');
        outputError(e);
        process.exit(1);
      }
      passphrase = process.env.THEO_PRIVATE_KEY_PASSPHRASE || false;
      try {
        private_key = await readFile(process.env.THEO_PRIVATE_KEY);
      } catch (e) {
        outputError(e);
        process.exit(1);
      }
    }
    let public_keys;
    if (argv.key) {
      if (typeof argv.key === 'string') {
        public_keys = [argv.key];
      } else {
        public_keys = argv.key;
      }
    } else {
      const e = new Error('At least specify 1 public ssh key');
      outputError(e);
      process.exit(1);
    }
    if (argv.sign) {
      payload.keys = [];
      const signer = new Signer(private_key, passphrase);
      public_keys.forEach(public_key => {
        const signature = signer.sign(public_key);
        payload.keys.push({
          key: public_key,
          signature
        });
      });
    } else {
      payload.keys = public_keys;
    }
    const account = await post('/accounts/' + argv.account + '/keys', payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
