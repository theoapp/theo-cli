import crypto from 'crypto';

class Signer {
  constructor(key, passphrase) {
    this.private_key = {
      key,
      passphrase
    };
  }

  sign(data) {
    return crypto.sign(null, Buffer.from(data), this.private_key).toString('hex');
  }
}

export default Signer;
