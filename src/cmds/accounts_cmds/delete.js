import { del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'rm <id>';
exports.desc = 'Remove account';
exports.builder = {};
exports.handler = async argv => {
  try {
    const account = await del('/accounts/' + argv.id);
    outputJson(account);
  } catch (err) {
    outputError(err);
  }
};
