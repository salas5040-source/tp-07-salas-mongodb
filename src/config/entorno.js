process.loadEnvFile?.();

const entorno = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || ''
};

module.exports = entorno;