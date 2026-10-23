const dns = require('node:dns');
const mongoose = require('mongoose');
const { mongodbUri } = require('./entorno');


dns.setServers(['8.8.8.8', '1.1.1.1']);

const conectarBD = async () => {
  if (!mongodbUri) {
    throw new Error('La variable MONGODB_URI no está definida en el entorno.');
  }
  
  await mongoose.connect(mongodbUri);
};

const desconectarBD = async () => {
  await mongoose.disconnect();
};

module.exports = { conectarBD, desconectarBD };