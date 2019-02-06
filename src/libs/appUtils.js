export const checkEnv = function() {
  if (!process.env.THEO_URL || !process.env.THEO_TOKEN) {
    console.error('Please set THEO_URL and THEO_TOKEN in your environment');
    process.exit(1);
  }
};
