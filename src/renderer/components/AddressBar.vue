<template>
  <div>
    <button @click="back">back</button>
    <input types="text" v-model="address" />
    <button @click="gotoUrl(address)" >Go!</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import EventBus from '@/EventBus';

  export default {
    name: 'AddressBar',
    data() {
      return {
        address: ''
      };
    },
    computed: {
      ...mapGetters(['url'])
    },
    watch: {
      url(url) {
        this.address = url;
      }
    },
    methods: {
      ...mapActions(['visit']),
      gotoUrl(url) {
        this.visit(url);
        // this.$store.dispatch('visit', url);
      },
      back() {
        EventBus.$emit('back');
      }
    },
    mounted() {
      this.url = this.$store.state.Url.url;
    }
  };
</script>

<style></style>