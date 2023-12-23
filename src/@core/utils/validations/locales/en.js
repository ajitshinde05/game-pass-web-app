import en from 'vee-validate/dist/locale/en.json';

export default {
  messages: {
    ...en.messages,
    txHash: 'Transaction hash is invalid',
    required: 'The field is required',
    confirmed: 'Passwords does not match',
  },
  names: {
    email: 'Email',
    password: 'Password',
  },
  fields: {
    password: {
      min: '{_field_} is too short, you want to get hacked?',
    },
  },
};
