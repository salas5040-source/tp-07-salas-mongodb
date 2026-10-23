const { Schema, model } = require('mongoose');

const reservaSchema = new Schema({
  estudiante: {
    type: String,
    required: [true, 'El campo estudiante es obligatorio.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El campo email es obligatorio.'],
    trim: true,
    match: [/@/, 'El email debe contener un @.']
  },
  sala: {
    type: String,
    required: [true, 'El campo sala es obligatorio.'],
    enum: {
      values: ['Sala Norte', 'Sala Sur', 'Sala Multimedia'],
      message: 'La sala debe ser: Sala Norte, Sala Sur o Sala Multimedia.'
    }
  },
  fecha: {
    type: String,
    required: [true, 'El campo fecha es obligatorio.'],
    trim: true
  },
  turno: {
    type: String,
    required: [true, 'El campo turno es obligatorio.'],
    enum: {
      values: ['Mañana', 'Tarde', 'Noche'],
      message: 'El turno debe ser: Mañana, Tarde o Noche.'
    }
  },
  personas: {
    type: Number,
    required: [true, 'El campo personas es obligatorio.'],
    min: [1, 'Debe haber al menos 1 persona.'],
    max: [6, 'Puede haber como máximo 6 personas.'],
    validate: {
      validator: Number.isInteger,
      message: 'La cantidad de personas debe ser un número entero.'
    }
  }
}, {
  collection: 'reservas',
  versionKey: false
});

const Reserva = model('Reserva', reservaSchema);

module.exports = Reserva;