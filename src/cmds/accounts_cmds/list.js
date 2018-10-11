import { get } from '../../libs/httpUtils';

exports.command = 'list';
exports.desc = 'List accounts';
exports.builder = {};
exports.handler = async argv => {
  try {
    const accounts = await get('/accounts');
    console.log('+---------------------------+');
    console.log(JSON.stringify(accounts, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
