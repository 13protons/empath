<template>
  <div id="overlay">
    <img :src="activeOverlay.url">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['activeOverlay'])
    },
    name: 'Overlay'
  };
</script>

<style>

</style>