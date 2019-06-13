<template>
  <div id="overlay" :style="bgStyle">
    <!-- <img :src="activeOverlay.url"> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['activeOverlay']),
      bgStyle() {
        return {
          backgroundImage: `url('${this.activeOverlay.url}')`
        };
      }
    },
    name: 'Overlay'
  };
</script>

<style lang="scss">
  #overlay {
    position: fixed;
    width: 100%;
    height: calc(100vh - 3em);
    pointer-events: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
  }
</style>