import { get } from '../../libs/httpUtils';
import { outputError, outputJson } from '../../libs/stringUtils';

exports.command = 'list';
exports.desc = 'List accounts';
exports.builder = {};
exports.handler = async argv => {
  try {
    const accounts = await get('/accounts');
    outputJson(accounts);
  } catch (err) {
    outputError(err);
  }
};
