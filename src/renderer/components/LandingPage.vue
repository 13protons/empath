<template>
  <div id="wrapper">
    <div class="header">
      <top-bar />
    </div>
    
    <div class="main">
      <overlay />
      <guest />
    </div>

    <div class="side-panel" v-if="areOptionsOpen">
      <guest-options />
    </div>
    <div class="side-panel" v-if="isPanelOpen">
      <access />
    </div>
    <div id="filters">
      <div v-for="item in list" :key="item.raw" v-html="item.raw"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import TopBar from './Header.vue';
  import Access from './A11y.vue';
  import Guest from './Guest.vue';
  import GuestOptions from './Options.vue';
  import Overlay from './Overlay.vue';

  export default {
    name: 'landing-page',
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['isPanelOpen', 'areOptionsOpen', 'list'])
    },
    components: {
      TopBar,
      Guest,
      Access,
      GuestOptions,
      Overlay
    }
  };
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
  }
  #filters, #filters svg {
    height: 0;
    overflow: hidden;
  }
  .side-panel {
    position: absolute;
    right: 0px;
    width: 80%;
    max-width: 360px;
    height: 100vh;
  }

  #wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: stretch;
    
    .header {
      height: 48px;
    }
    
    .main {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;

      display: flex;
      flex-direction: column;
      #guest {
        flex: 1;
      }
    }
  }
</style>
