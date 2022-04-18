import { post } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';
import { readFile } from '../../libs/fileUtils';
import Signer from '../../libs/signer';
import readline from 'readline';
import { Writable } from 'stream';
import sshpk from 'sshpk';

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

const signSSHPublicKeys = (public_keys, private_key, passphrase) => {
  const keys = [];
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
      keys.push({
        key: public_key,
        signature
      });
    } catch (err) {
      outputError({ reason: 'Unable to sign, is the passphrase correct?', error: err });
      process.exit(13);
    }
  });
  return keys;
};

const checkSSHPublicKeys = public_keys => {
  for (let i = 0; i < public_keys.length; i++) {
    checkSSHPublicKey(public_keys[i]);
  }
};

const checkSSHPublicKey = keyPub => {
  sshpk.parseKey(keyPub);
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
    .option('ssh-options', {
      alias: 'o',
      describe: 'SSH options',
      demand: false,
      type: 'string'
    })
    .demandOption(['key']);
};

exports.handler = async argv => {
  const { sshOptions, sign, signature, certificate } = argv;
  try {
    const payload = {};
    let private_key;
    let private_key_path;
    let passphrase;
    if (sign && signature) {
      const e = new Error('--sign and --signature are mutually exclusive');
      await outputError(e);
      process.exit(1);
    }
    if (sign) {
      if (certificate) {
        private_key_path = certificate;
      } else {
        if (!process.env.THEO_PRIVATE_KEY) {
          const e = new Error('Asked to sign but no -c or THEO_PRIVATE_KEY env provided');
          await outputError(e);
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
        await outputError(e);
        process.exit(11);
      }
    }
    if (signature) {
      console.log('typeof signature', typeof signature);
      if (typeof argv.key !== typeof signature) {
        const e = new Error('When using --signature number of keys and signatures must be the same');
        await outputError(e);
        process.exit(1);
      }
      if (typeof argv.key !== 'string') {
        if (signature.length !== argv.key.length) {
          const e = new Error('When using --signature number of keys and signatures must be the same');
          await outputError(e);
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
      await outputError(e);
      process.exit(1);
    }
    try {
      checkSSHPublicKeys(public_keys);
    } catch (e) {
      await outputError(e);
      process.exit(1);
    }

    if (sign) {
      payload.keys = signSSHPublicKeys(public_keys, private_key, passphrase);
    } else if (signature) {
      payload.keys = [];
      public_keys.forEach((public_key, i) => {
        payload.keys.push({
          key: public_key,
          signature: signature[i]
        });
      });
    } else {
      payload.keys = public_keys;
    }
    if (sshOptions) {
      try {
        const ssh_options = JSON.parse(sshOptions);
        payload.keys = payload.keys.map(k => {
          if (typeof k === 'string') {
            k = {
              key: k
            };
          }
          k.ssh_options = ssh_options;
          return k;
        });
      } catch (e) {
        console.error('Invalid ssh_options, it must be valid JSON', e);
        process.exit(2);
      }
    }
    const account = await post('/accounts/' + argv.account + '/keys', payload);
    outputJson(account);
  } catch (err) {
    await outputError(err);
  }
};
