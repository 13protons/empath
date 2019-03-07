<template>
  <div id="wrapper">
    <div class="header">
      <top-bar />
    </div>
    <div class="main">
      <guest />
    </div>
  </div>
</template>

<script>
  import TopBar from './Header.vue';
  import Guest from './Guest.vue';

  export default {
    name: 'landing-page',
    components: {
      TopBar,
      Guest
    }
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
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
