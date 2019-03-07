<template>
  <div id="A11y">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle">
            Accessibility
          </p>
        </div>
      </div>

      <div class="level-right">
        <p class="level-item">
          <button class="button is-white" @click="closePanel">
            <i class="material-icons">
              close
            </i>
          </button>
        </p>
      </div>
    </nav>

    <fuzzy />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import Fuzzy from './A11y/Fuzzy.vue';

  export default {
    name: 'A11y',
    methods: {
      ...mapActions(['closePanel'])
    },
    components: {
      Fuzzy
    }
  };
</script>

<style lang="scss" >
  #A11y {
    padding: .5em 1em;
  }
  nav {
    border-bottom: 2px solid #eee;
  }
</style>