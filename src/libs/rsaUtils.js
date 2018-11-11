import crypto from 'crypto';

class Signer {
  constructor(key, passphrase) {
    this.private_key = {
      key,
      passphrase
    };
  }

  sign(data) {
    const sign = crypto.createSign('SHA256');
    sign.update(data);
    return sign.sign(this.private_key, 'hex');
  }
}

export default Signer;
