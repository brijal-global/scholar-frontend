const envConfigs = {
  APP_NAME: process.env.APP_NAME,
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  MAX_MEMORY: process.env.MAX_MEMORY,
  MIN_MEMORY: process.env.MIN_MEMORY,
  BE_URL: process.env.NEXT_PUBLIC_BE_URL,
  API_URL: `${process.env.NEXT_PUBLIC_BE_URL}/api`,
};

export default envConfigs;
