import { get } from '../../libs/httpUtils';

exports.command = 'get <id>';
exports.desc = 'Get account';
exports.builder = {};
exports.handler = async argv => {
  try {
    const account = await get('/accounts/' + argv.id);
    console.log('+---------------------------+');
    console.log(JSON.stringify(account, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};