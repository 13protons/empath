<template>
  <div id="Options">
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item">
        <i class="material-icons">
              menu
          </i>
        </p>
      </div>
      <div class="level-item has-text-centered">
        <p class="subtitle">
          Options
        </p>
      </div>
      <div class="level-right">
        <p class="level-item">
          <button class="button is-white has-text-right" @click="toggleOptions">
            <i class="material-icons">
              close
            </i>
          </button>
        </p>
      </div>
    </nav>

    <!-- <fuzzy /> -->
    <div id="controls">
      <div class="action">
        <h3>Dev Tools</h3>
        <small class="desc">Open or Close dev tools</small>

        <button @click="toggleDevTools"
                class="button"
                :class="{'is-primary': devToolsOpen}">
          Toggle Dev Tools
        </button>
        <hr/>
      </div>
    </div>
 
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import EventBus from '@/EventBus';

  export default {
    name: 'Options',
    computed: {
      ...mapGetters(['devToolsOpen'])
    },
    methods: {
      ...mapActions(['toggleDevTools', 'toggleOptions'])
    },
    components: {
    }
  };
</script>

<style lang="scss" >
  #Options {
    display: flex;
    padding: 0 1em;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
  }
  nav {
    border-bottom: 2px solid #eee;
    max-height: 2.6em;
  }

  small.desc {
    display: block;
    color: #aaa;
    font-size: .8em;
    margin: 1em 0;
  }
  #reset, #controls, nav {
    flex: 1;
    flex-direction: row;
    align-items: stretch;
  }
  #controls {
    overflow: scroll;
  }
</style>