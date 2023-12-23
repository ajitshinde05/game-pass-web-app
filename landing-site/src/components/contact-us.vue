<template>
  <section class="container pt-0 pb-0 mb-0 mt-0">
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="12" lg="12" sm="12" class=" ">
        <b-row class=" ">
          <b-col cols="12" md="12" lg="12" sm="12">
            <h3 style="text-align: center">
              {{ $t('ContactUs.ContactUsTitle') }}
            </h3>
            <p class="text-muted mt-4" style="text-align: center">
              {{ $t('ContactUs.Title') }}
            </p>
          </b-col>
        </b-row>

        <b-card-text title-tag="h2" class="title"></b-card-text>

        <b-row class="align-items-center mt-4">
          <b-col cols="12" lg="6" sm="12">
            <img
              src="@/assets/images/Contact.svg"
              width="100%"
              height="315"
              class="img-fluid box-border contactimg"
              alt="GIF"
            />
          </b-col>
          <b-col cols="12" lg="6" sm="12">
            <div class="cardborder margincard m-4 align-items-center">
              <div class="info-item align-items-center mt-4 mb-4">
                <span>{{ $t('ContactUs.ForSupportQueries') }}</span>
                <a>{{ $t('ContactUs.ForSupportQueriesEmail') }}</a>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
  import { BRow, BCol, BCardText } from 'bootstrap-vue';

  export default {
    components: {
      BRow,
      BCol,
      BCardText,
    },
    data() {
      return {
        name: '',
        email: '',
        subject: '',
        message: '',
        agree: false,
      };
    },
    methods: {
      submitForm() {
        // Implement your form submission logic here
        console.log('Form submitted');
      },
    },
  };
</script>

<style scoped>
  .contact-us {
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    margin: 0 auto;
  }

  .contact-info {
    flex-basis: 45%;
  }
  .info-item a {
    color: #f7931a;
  }
  .info-item {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .info-item span {
    color: #2b2b36;
    font-size: 17px;
    font-family: Roboto;
    line-height: 31.429px;
  }
  .title {
    text-align: center;
  }
  .info-item b-icon-envelope-fill {
    margin-right: 10px;
  }
  .contact-form {
    flex-basis: 45%;
  }

  .contact-form h3 {
    margin-bottom: 20px;
  }

  .social-media {
    flex-basis: 100%;
    margin-top: 20px;
  }

  .social-media h4 {
    margin-bottom: 10px;
  }

  .social-icons {
    display: flex;
  }

  .social-icons b-icon {
    margin-right: 10px;
  }
  .contactimg {
    width: 70%;
  }
</style>
