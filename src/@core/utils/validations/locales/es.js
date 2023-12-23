import es from 'vee-validate/dist/locale/es.json';

export default {
  messages: {
    ...es.messages,
    txHash: 'El hash de la transacción no es válido',
    required: 'El campo es obligatorio',
  },
  names: {
    email: 'Email',
    password: 'Contraseña',
  },
  fields: {
    password: {
      min: 'El campo es demasiado corto, ¿quieres que te pirateen?',
    },
  },
};
