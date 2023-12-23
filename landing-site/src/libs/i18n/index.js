import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
function loadLocaleMessages() {
  const locales = require.context(
    './locales',
    false,
    /[A-Za-z0-9-_,\s]+\.js$/i,
  );
  const messages = {};

  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });

  return messages;
}

function localeLanguage() {
  const url = window.location.pathname; // Get the current URL path
  const languageCode = url.split('/')[1]; // The language code is the first part of the URL path
  let name;

  if (languageCode && /^[a-zA-Z]{2}$/.test(languageCode)) {
    name = languageCode;
  }

  if (name) {
    const locales = require.context(
      './locales',
      false,
      /[A-Za-z0-9-_,\s]+\.js$/i,
    );
    const messages = [];

    locales.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        if (name === locale) {
          messages.push(locale);
        }
      }
    });
    if (!messages.length) {
      name = undefined;
    }
  }
  const newLocale = name || localStorage.getItem('appLocale') || 'en';
  return newLocale;
}

export default new VueI18n({
  locale: localeLanguage(),
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});
