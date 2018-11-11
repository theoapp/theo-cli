import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';
import { readFile } from '../../libs/fileUtils';
import Signer from '../../libs/rsaUtils';

exports.command = 'add <account> [options]';
exports.desc = 'Add key to account';
exports.builder = yargs => {
  return (
    yargs
      .option('key', {
        alias: 'k',
        describe: 'Public ssh key',
        type: 'string',
        demand: true
      })
      .option('sign', {
        alias: 's',
        describe: 'sign Public ssh key with private key provided',
        type: 'string'
      })
      .option('passphrase', {
        alias: 'p',
        describe: 'private key passhrase',
        type: 'string'
      })
      /*
      TODO read passphrase from stdin
      .option('passphrase-stdin', {
        alias: 'i',
        describe: 'Read private key passhrase from stdin',
        boolean: true
      })
      */
      .demandOption(['key'])
  );
};

exports.handler = async argv => {
  try {
    const payload = {};
    let private_key;
    let passphrase;
    if (argv.sign) {
      if (argv.passphrase) {
        passphrase = argv.passphrase;
      }
      try {
        private_key = await readFile(argv.sign);
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
      throw new Error('At least specify 1 public ssh key');
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
