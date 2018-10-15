import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'get <id>';
exports.desc = 'Get account';
exports.builder = {};
exports.handler = async argv => {
  try {
    const account = await get('/accounts/' + argv.id);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
