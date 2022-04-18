import Signer from '../src/libs/signer';
import { readFile } from '../src/libs/fileUtils';
import assert from 'assert';
import path from 'path';

const private_eddsa_key_path = './eddsa.pem';
const private_key_path = './private.pem';
const passphrase = 'theoTest';

const controlKeysRSA = [
  {
    public_key:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDmrOppl3/fJ0FQIArew6359EayhKpZPIk8GjWHzIAtWBASFrxg27tSR1KdKSHEr2KZOu5bUKNJbTutHFAeNE8TgbyazzwuoWPcne8vP4C1EqalNoIaEadISjR6FmacZm+ik5bf7/EO/vl/gREfWnZESpfXg9fKZE/WxY/SroL4FJS8xqjoPDm0XXPsCgmMghctvaa91ZOI/cX51CwmcP52fhnW2+ulET5UYHuGWkTocZOPAVdvSqv1KgieScxSxQTmCyVvYPylRolvKS9qokKnzK0GVFlThKBSXcb33lxkQhTVVSM/B/UFRvcf0Q+OTxUeB9PcRVEVl9SjGPJhyz/pIerJhYi1qiNG+llv1bA+O8cLgltieFJdmAmI3COyqrgtFrtAeU3WnUws2RkDiM1jH8r1dqg2JcELpxykAp4uktHsO0gGonrSdtJxjZwXf437g+8fteLSHxWpDp/z8WV2wXaAcGGtokJ6kiW3FOXddpjd0IT7rGOAag8dXvq45CFLnnHOwPfp9gNi6SHS32VyOBZ46pCv0cRlqBS2rEZ8dtfP969RR+TPdlQOFu7ELFHWnvST7vEeQLHFZfrhLODA091UV2dF1bXy+gcYZGX4qmd/Ea1Ov0fgQwLxE9ExMqHYnVQtHHUw/XJsAlqo8IIxUoEd9sDwv1ymCbFgi7tBKQ== theo@laptop',
    signature:
      '3845e32e11d4cc3e3b72b21131e564d49d54604a9bf933fe9493a758303b96705ae63c94c7a8bba72e64b15b7d487fe0fd8f2de056295b71a747430c29e941fc7ee0cb981307a8b2b105d61e33445ecb73b697c7e9eb37482277b3cf74fe04dfa0a6a1837a3dcaa5c4e338ae84d74efa271c94c15d8b425439d82d01aa6ae95c72a72d0eeeb512e8924d3b7b84a99a8c1e547e298a1ee22db96e32b5cbc8b1d146d25f4189b8d1918d23c9af97244d204bfa28ae91ab69cd1f406cf6ae688ad2f912f17d9189669887a89ce3610b1508508d88637cdc03027452149626dbc3bb85b9dc9f0cee28506b4ba463eb47c204f99aece5fbd80797ded062b7b5b737852e252f3a0f7c9b76391feca84c1a4ab8308c11e93de8e2c32f159f480061a65fc73b11ad0ead49c9f146c25869f9e4cdf5c01d422223df2a6d4d24a7c3a9d3f9d796fbc1dd0f9e10552f0fbfa628da4e9b240b44fb2709f4d6130c12ea87f2d055fb6e85c3d968c2fdf3c90a2d4f875321c9f0b482cd1aa0da66293c218b617fdcf7c40998670c402f2d9d58f18d0ede5580a46f0c0415d5ff3b56b8b400e29c9495c3b9a7f3b3d41a5deb0735ff1bbb9c94e45159cc9d2951f23796c7d0ab6d76d75b75e0b55c1ece35277114f0836c731e81292da673bae64bf1ac4a61d4d4e08c20f3037bad3dcc8717afcbff20ce398c11b489ca98d1a45b9e52dd0007a1'
  }
];

const controlKeysEDDSA = [
  {
    public_key:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDmrOppl3/fJ0FQIArew6359EayhKpZPIk8GjWHzIAtWBASFrxg27tSR1KdKSHEr2KZOu5bUKNJbTutHFAeNE8TgbyazzwuoWPcne8vP4C1EqalNoIaEadISjR6FmacZm+ik5bf7/EO/vl/gREfWnZESpfXg9fKZE/WxY/SroL4FJS8xqjoPDm0XXPsCgmMghctvaa91ZOI/cX51CwmcP52fhnW2+ulET5UYHuGWkTocZOPAVdvSqv1KgieScxSxQTmCyVvYPylRolvKS9qokKnzK0GVFlThKBSXcb33lxkQhTVVSM/B/UFRvcf0Q+OTxUeB9PcRVEVl9SjGPJhyz/pIerJhYi1qiNG+llv1bA+O8cLgltieFJdmAmI3COyqrgtFrtAeU3WnUws2RkDiM1jH8r1dqg2JcELpxykAp4uktHsO0gGonrSdtJxjZwXf437g+8fteLSHxWpDp/z8WV2wXaAcGGtokJ6kiW3FOXddpjd0IT7rGOAag8dXvq45CFLnnHOwPfp9gNi6SHS32VyOBZ46pCv0cRlqBS2rEZ8dtfP969RR+TPdlQOFu7ELFHWnvST7vEeQLHFZfrhLODA091UV2dF1bXy+gcYZGX4qmd/Ea1Ov0fgQwLxE9ExMqHYnVQtHHUw/XJsAlqo8IIxUoEd9sDwv1ymCbFgi7tBKQ== theo@laptop',
    signature:
      'f08dc409a2d8293ea32ec4b30709cda1bffcf783606b98900bbeb7ce597868cf8ee7427f947c14eea8c7fb7022f82adf242a4fac33d053aafaedcbbdab9a4c03'
  }
];

describe('Test signature', function() {
  describe('Signer should be instantiated and sign correctly (RSA)', function() {
    let signer;
    it('should be instantiated', async function() {
      try {
        const private_key = await readFile(path.join(__dirname, private_key_path));
        signer = new Signer(private_key, passphrase);
        assert.strictEqual(typeof signer, 'object');
      } catch (err) {
        assert.strictEqual(null, err);
      }
    });
    it('should sign correctly', function() {
      for (let i = 0; i < controlKeysRSA.length; i++) {
        const signature = signer.sign(controlKeysRSA[i].public_key);
        assert.strictEqual(signature, controlKeysRSA[i].signature);
      }
    });
  });

  describe('Signer should be instantiated and sign correctly (EdDSA)', function() {
    let signer;
    it('should be instantiated', async function() {
      try {
        const private_key = await readFile(path.join(__dirname, private_eddsa_key_path));
        signer = new Signer(private_key, passphrase);
        assert.strictEqual(typeof signer, 'object');
      } catch (err) {
        assert.strictEqual(null, err);
      }
    });
    it('should sign correctly', function() {
      for (let i = 0; i < controlKeysEDDSA.length; i++) {
        const signature = signer.sign(controlKeysEDDSA[i].public_key);
        assert.strictEqual(signature, controlKeysEDDSA[i].signature);
      }
    });
  });
});
