import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'get <id>';
exports.desc = 'Get group';
exports.builder = {};
exports.handler = async argv => {
  try {
    const group = await get('/groups/' + argv.id);
    outputJson(group);
  } catch (err) {
    outputError(err);
  }
};
