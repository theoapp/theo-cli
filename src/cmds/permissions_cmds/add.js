import { post } from '../../libs/httpUtils';

exports.command = 'add <account> [options]';
exports.desc = 'Add permission to account';
exports.builder = yargs => {
  return yargs
    .option('host', {
      alias: 'h',
      describe: 'Host name'
    })
    .option('user', {
      alias: 'u',
      describe: 'User name'
    })
    .demandOption(['host', 'user']);
};
exports.handler = async argv => {
  try {
    const { account, user, host } = argv;
    const payload = {
      user,
      host
    };
    const ret = await post('/accounts/' + account + '/permissions', payload);
    console.log('+---------------------------+');
    console.log(JSON.stringify(ret, null, 3));
    console.log('+---------------------------+');
  } catch (ex) {
    console.error(ex);
  }
};
