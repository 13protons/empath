<template>
  <div id="addressBar" v-on:keyup.enter="handleEnter">
    <b-field grouped>
      <p class="control">
        <button class="button is-white" @click="back">
            <i class="material-icons">
              arrow_back
            </i>
        </button>

      </p>
      
      <b-field expanded>
        <b-autocomplete
            expanded
            rounded
            v-model="address"
            :data="filteredDataArray"
            placeholder="Enter a URL"
            :loading="isLoading"
            :keep-first="true"
            :open-on-focus="false"
            @select="option => selected = option">
            <template slot="header">
              <span> Search the web for "{{address}}" </span>
            </template>
        </b-autocomplete>
      </b-field>

      <p class="control">
        <button class="button is-white" @click="openPanel">
          <i class="material-icons">
              more_vert
          </i>
        </button>
      </p>
    </b-field>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import EventBus from '@/EventBus';

  export default {
    name: 'AddressBar',
    data() {
      return {
        address: '',
        data: [
          'Angular',
          'Angular 2',
          'Aurelia',
          'Backbone',
          'Ember',
          'jQuery',
          'Meteor',
          'Node.js',
          'Polymer',
          'React',
          'RxJS',
          'Vue.js'
        ],
      };
    },
    computed: {
      ...mapGetters(['url', 'isLoading']),
      filteredDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.address.toLowerCase()) >= 0;
        });
      }
    },
    watch: {
      url(url) {
        this.address = url;
      }
    },
    methods: {
      ...mapActions(['visit', 'openPanel', 'clearHistory']),
      gotoUrl(url) {
        console.log('visiting', url);
        this.visit(url);
        // this.$store.dispatch('visit', url);
      },
      handleEnter() {
        this.gotoUrl(this.address);
        // console.log('keyup', e);
      },
      back() {
        EventBus.$emit('back');
      }
    },
    mounted() {
      this.address = this.$store.state.Url.url;
    }
  };
</script>

<style>
#addressBar {
  margin: .25em;
}
</style>