const { conectarBD, desconectarBD } = require('../src/config/base-datos');

(async () => {
  try {
    console.log('Intentando conectar a MongoDB Atlas...');
    await conectarBD();
    console.log('¡Conexión exitosa a la base de datos!');
    await desconectarBD();
    process.exit(0);
  } catch (error) {
    console.error('Fallo en la conexión:', error.message);
    process.exit(1);
  }
})();