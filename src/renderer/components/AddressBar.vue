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

      <b-input placeholder="Enter a URL or Search the Web"
          expanded
          rounded
          type="text"
          v-model="address"
          :loading="isLoading"
          >
          <!-- icon="language" -->
      </b-input>
      <p class="control">
        <button class="button is-white" @click="toggleOptions">
          <i class="material-icons">
              menu
          </i>
        </button>
      </p>
      <p class="control">
        <button class="button is-white" @click="togglePanel">
          <i class="material-icons">
              accessibility
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
      };
    },
    computed: {
      ...mapGetters(['url', 'isLoading'])
    },
    watch: {
      url(url) {
        this.address = url;
      }
    },
    methods: {
      ...mapActions(['visit', 'togglePanel', 'toggleOptions']),
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