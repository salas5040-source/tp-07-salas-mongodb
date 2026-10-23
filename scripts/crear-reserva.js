const { conectarBD, desconectarBD } = require('../src/config/base-datos');
const Reserva = require('../src/modelos/reserva');

(async () => {
  try {
    await conectarBD();

    const nuevaReserva = new Reserva({
      estudiante: 'María Salas',
      email: 'maria.salas@example.com',
      sala: 'Sala Norte',
      fecha: '2026-11-01',
      turno: 'Tarde',
      personas: 6
    });

    const reservaGuardada = await nuevaReserva.save();
    console.log('¡Reserva guardada exitosamente!');
    console.log(`_id confirmado: ${reservaGuardada._id.toString()}`);

  } catch (error) {
    console.error('Error al crear la reserva:', error.message);
    process.exitCode = 1;
  } finally {
    await desconectarBD();
  }
})();