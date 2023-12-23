<template>
  <div class="locale-select-sheet">
    <b-dropdown id="dropdown-grouped" variant="link" class="dropdown-language">
      <template #button-content>
        <div class="d-flex align-items-center img-fluid1">
          <img
            :src="currentLocale.img"
            :alt="currentLocale.locale"
            class="img-fluid12"
          />
        </div>
      </template>
      <b-dropdown-item
        v-for="localeObj in locales"
        :key="localeObj.locale"
        @click.stop="changeLocale(localeObj.locale)"
      >
        <b-img
          :src="localeObj.img"
          height="22px"
          width="22px"
          :alt="localeObj.locale"
        />
        <span class="ml-50">{{ localeObj.name }}</span>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
  import { BDropdown, BDropdownItem, BImg } from 'bootstrap-vue';
  import { localize } from 'vee-validate';
  import ru from '@/router/PageTitleLocales/ru';
  import en from '@/router/PageTitleLocales/en';
  import es from '@/router/PageTitleLocales/es';

  const titleLocales = { ru, en, es };

  export default {
    components: {
      BDropdown,
      BDropdownItem,
      BImg,
    },
    // ! Need to move this computed property to comp function once we get to Vue 3
    computed: {
      currentLocale() {
        return this.locales.find((l) => l.locale === this.$i18n.locale);
      },
    },
    methods: {
      changeLocale(newLocale) {
        // Localize vee-validate
        // localize(newLocale);

        // // Dynamic assign page title
        // const newTitle =
        //   titleLocales[newLocale][this.$route.name] ||
        //   titleLocales[newLocale].DEFAULT_TITLE;

        // document.title = newTitle;

        // document
        //   .querySelector('meta[property="og:title"]')
        //   .setAttribute('content', newTitle);

        // // localize i18n
        // this.$i18n.locale = newLocale;

        // save locale to local storage
        localStorage.setItem('appLocale', newLocale);
        this.updateQueryParameters(newLocale);
      },
      updateQueryParameters(newLocale) {
        const currentPath = window.location.pathname;

        const languageCodeRegex1 = new RegExp(`^/${newLocale}(\/|$)`);
        const isLanguageAvailable = languageCodeRegex1.test(currentPath);

        if (!isLanguageAvailable) {
          const languageCodeRegex = /^\/[a-zA-Z]{2}(\/|$)/;
          const hasLanguageCode = languageCodeRegex.test(currentPath);

          let newPath;

          if (hasLanguageCode) {
            newPath = currentPath.replace(languageCodeRegex, `/${newLocale}/`);
          } else if (currentPath === '/') {
            newPath = `/${newLocale}`;
          } else {
            newPath = `/${newLocale}${currentPath}`;
          }

          window.history.pushState({}, '', newPath);

          window.location.reload();
        }
      },
    },
    setup() {
      /* eslint-disable global-require */
      const locales = [
        {
          locale: 'en',
          img: require('@/assets/images/flags/en.svg'),
          name: 'English',
        },
        {
          locale: 'es',
          img: require('@/assets/images/flags/es.svg'),
          name: 'Español',
        },
        {
          locale: 'ru',
          img: require('@/assets/images/flags/ru.svg'),
          name: 'Русский',
        },
      ];
      /* eslint-disable global-require */

      return {
        locales,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .img-fluid1 {
    visibility: visible;
    opacity: 1;
    right: 15px;
    bottom: 15px;
    z-index: 996;
    background: #7268ef;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    transition: all 0.4s;
  }
  .img-fluid12 {
    object-fit: cover; /* Maintain the image aspect ratio and cover the container */
    border-radius: 20px;

    width: 30px;
    height: 30px;
  }
  @import '@core/scss/vue/pages/all-pages.scss';
</style>
