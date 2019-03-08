<template>
  <div id="wrapper">
    <div class="header">
      <top-bar />
    </div>
    
    <div class="main">
      <guest />
    </div>

    <div id="panel" v-if="isPanelOpen">
      <access />
    </div>
    <div id="filters" v-html="svg"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import filter from '@/assets/filters/astigmatism.svg';

  import TopBar from './Header.vue';
  import Access from './A11y.vue';
  import Guest from './Guest.vue';

  export default {
    name: 'landing-page',
    data() {
      return {
        svg: filter
      };
    },
    computed: {
      ...mapGetters(['isPanelOpen'])
    },
    components: {
      TopBar,
      Guest,
      Access
    }
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  #filters {
    height: 0
  }
  #panel {
    position: absolute;
    right: 0px;
    width: 80%;
    height: 100vh;
    background-color: white;
    border-left: 1px solid gray;
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
