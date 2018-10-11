import { del } from '../../libs/httpUtils';

exports.command = 'rm <id>';
exports.desc = 'Remove account';
exports.builder = {};
exports.handler = async argv => {
  try {
    const account = await del('/accounts/' + argv.id);
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
