<template>
  <div style="position: relative; width: 100%" class="search-filter">
    <b-form-group>
      <b-input-group class="">
        <b-form-input
          v-b-toggle.collapse-1
          v-model="search_txt"
          autocomplete="off"
          @keyup.enter="selectIcon()"
          @input="clickTxt()"
          @click="handleClick"
          :placeholder="$t('SearchComponent.SearchFiledPlaceholder')"
          :class="
            visible
              ? 'search-icon-input collapsed-icons d-inline-block search-bg-up'
              : 'search-icon-input d-inline-block search-bg'
          "
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="collapse-4"
        ></b-form-input>
      </b-input-group>

      <div v-if="visible" ref="divRef" class="search-icon-modal mb-1">
        <b-card class="search-card">
          <div
            v-for="(field, index) in filter"
            :key="index"
            class="searchable-item cursor-pointer"
            @click="selectIcon(field)"
          >
            <span class="cursor-pointer">
              {{ field }}
            </span>
          </div>
        </b-card>
      </div>
    </b-form-group>
  </div>
</template>

<script>
  import {
    BCard,
    BCollapse,
    BFormInput,
    BCol,
    VBToggle,
    BInputGroup,
    BFormGroup,
  } from 'bootstrap-vue';

  // Note: Vue automatically prefixes the directive name with 'v-'

  export default {
    name: 'Search',
    components: {
      BCard,
      BCollapse,
      BFormInput,
      BCol,
      VBToggle,
      BInputGroup,
      BFormGroup,
    },
    props: ['addresses', 'value', 'setValue'],

    data() {
      return {
        test: '',
        visible: false,
        search_txt: '',
        filter: this.addresses,
      };
    },
    directives: {
      'b-toggle': VBToggle,
    },
    mounted() {
      document.addEventListener('click', this.handleOutsideClick);
    },
    watch: {
      addresses(newArray) {
        this.filter = newArray; // Update the data array when the prop changes
      },
    },
    computed: {},
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
      handleOutsideClick(event) {
        const clickedElement = event.target;
        if (!this.$el.contains(clickedElement)) {
          this.visible = false;
        }
      },
      searchSubText(subText) {
        return this.addresses.filter((string) => string.includes(subText));
      },
      selectIcon(field) {
        this.visible = false;
        this.search_txt = field;
        this.setValue(field);
      },

      clickTxt() {
        this.setValue(this.search_txt);
        if (this.search_txt) {
          this.filter = this.searchSubText(this.search_txt);
          this.visible = true;
        } else {
          this.visible = false;
        }
      },
      handleClick() {
        this.visible = !this.visible;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@core/scss/base/bootstrap-extended/_variables.scss';
  .search-bg {
    background-image: url('../../assets/images/icons/chevron-down.png');
    background-repeat: no-repeat;
    background-position: center right 7px;
    padding-right: 35px;
  }
  .search-bg-up {
    background-image: url('../../assets/images/icons/chevron-up.png');
    background-repeat: no-repeat;
    background-position: center right 7px;
    padding-right: 35px;
  }
  .search-filter {
    float: left;
    margin-right: 15px;
    margin-left: auto;
    .form-group {
      margin-bottom: 0px;
    }
  }
  .search-card {
    background-color: #ffffff;
    z-index: 9;
    margin-top: 14px;
    max-width: 73%;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
    .card-body {
      padding: 0rem;
      .searchable-item {
        float: left;
        width: 100%;
        padding: 0.7rem 0.8rem;
        border-bottom: 1px solid #ddd;
        &:hover {
          background-color: rgba(115, 103, 240, 0.12);
          color: #7367f0;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .search-icon-modal {
    position: absolute;
    z-index: 9;
    padding: 10px;
    margin-top: -17px !important;
    min-width: 100%;
    min-height: 32vh;
    padding: 5px 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin: 0;
  }
</style>
