import crypto from 'crypto';

class Signer {
  constructor(key, passphrase) {
    this.private_key = {
      key,
      passphrase
    };
  }

  sign(data) {
    return crypto
      .createSign('SHA256')
      .update(data)
      .sign(this.private_key, 'hex');
  }
}

export default Signer;
