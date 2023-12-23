import ru from 'vee-validate/dist/locale/ru.json';

export default {
  messages: {
    ...ru.messages,
    txHash: 'Хеш транзакции не верен',
    required: 'Поле обязательно для заполнения',
    confirmed: 'Пароли не совпадают',
  },
  names: {
    email: 'Email',
    password: 'Пароль',
  },
  fields: {
    password: {
      min: '{_field_} слишком короткий, ты что, хочешь быть взломан?',
    },
  },
};
