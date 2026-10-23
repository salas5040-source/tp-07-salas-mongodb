const { conectarBD, desconectarBD } = require('../src/config/base-datos');
const Reserva = require('../src/modelos/reserva');

(async () => {
  try {
    await conectarBD();

    const reservas = await Reserva.find();
    console.log(`\nCantidad de reservas recuperadas: ${reservas.length}`);
    console.log('--- Listado de Reservas ---');
    
    reservas.forEach((res, index) => {
      console.log(`${index + 1}. ID: ${res._id.toString()} | Estudiante: ${res.estudiante} | Sala: ${res.sala} | Turno: ${res.turno}`);
    });

  } catch (error) {
    console.error('Error al listar las reservas:', error.message);
    process.exitCode = 1;
  } finally {
    await desconectarBD();
  }
})();