import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';
import { readFile } from '../../libs/fileUtils';
import Signer from '../../libs/rsaUtils';
import readline from 'readline';
import { Writable } from 'stream';

const readPassphrase = () => {
  const mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
      if (!this.muted) process.stdout.write(chunk, encoding);
      callback();
    }
  });
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: mutableStdout,
      terminal: true
    });

    mutableStdout.muted = false;
    rl.question('Passphrase: ', answer => {
      rl.close();
      resolve(answer);
    });
    mutableStdout.muted = true;
  });
};

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
        'sign Public ssh key with private key. (Needs THEO_PRIVATE_KEY env (or -c) and THEO_PRIVATE_KEY_PASSPHRASE env (or -p / -i))',
      boolean: true
    })
    .option('certificate', {
      alias: 'c',
      describe: 'Path to private key',
      type: 'string'
    })
    .option('passphrase', {
      alias: 'p',
      describe: 'passphrase for private key',
      type: 'string'
    })
    .option('passphrase-stdin', {
      alias: 'i',
      describe: 'read passphrase for private key from stdin',
      boolean: true
    })
    .option('signature', {
      alias: 'g',
      describe: "Public ssh key' signature",
      type: 'string'
    })
    .demandOption(['key']);
};

exports.handler = async argv => {
  try {
    const payload = {};
    let private_key;
    let private_key_path;
    let passphrase;
    if (argv.sign && argv.signature) {
      const e = new Error('--sign and --signature are mutually exclusive');
      outputError(e);
      process.exit(1);
    }
    if (argv.sign) {
      if (argv.certificate) {
        private_key_path = argv.certificate;
      } else {
        if (!process.env.THEO_PRIVATE_KEY) {
          const e = new Error('Asked to sign but no -c or THEO_PRIVATE_KEY env provided');
          outputError(e);
          process.exit(1);
        }
        private_key_path = process.env.THEO_PRIVATE_KEY;
      }
      if (argv.passphrase) {
        passphrase = argv.passphrase;
      } else if (argv.passphraseStdin) {
        passphrase = await readPassphrase();
      } else {
        passphrase = process.env.THEO_PRIVATE_KEY_PASSPHRASE || false;
      }
      try {
        private_key = await readFile(private_key_path);
      } catch (e) {
        outputError(e);
        process.exit(11);
      }
    }
    if (argv.signature) {
      console.log('typeof argv.signature', typeof argv.signature);
      if (typeof argv.key !== typeof argv.signature) {
        const e = new Error('When using --signature number of keys and signatures must be the same');
        outputError(e);
        process.exit(1);
      }
      if (typeof argv.key !== 'string') {
        if (argv.signature.length !== argv.key.length) {
          const e = new Error('When using --signature number of keys and signatures must be the same');
          outputError(e);
          process.exit(1);
        }
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
      let signer;
      try {
        signer = new Signer(private_key, passphrase);
      } catch (err) {
        outputError(err);
        process.exit(12);
      }
      public_keys.forEach(public_key => {
        try {
          const signature = signer.sign(public_key);
          payload.keys.push({
            key: public_key,
            signature
          });
        } catch (err) {
          outputError({ reason: 'Unable to sign, is the passphrase correct?', error: err });
          process.exit(13);
        }
      });
    } else if (argv.signature) {
      payload.keys = [];
      public_keys.forEach((public_key, i) => {
        payload.keys.push({
          key: public_key,
          signature: argv.signature[i]
        });
      });
    } else {
      payload.keys = public_keys;
    }
    console.log(payload);
    const account = await post('/accounts/' + argv.account + '/keys', payload);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
