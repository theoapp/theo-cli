import { del } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'rm <id>';
exports.desc = 'Remove group';
exports.builder = {};
exports.handler = async argv => {
  try {
    const res = await del('/groups/' + argv.id);
    outputJson(res);
  } catch (err) {
    outputError(err);
  }
};
