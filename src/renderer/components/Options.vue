<template>
  <div id="Options">
    <nav class="panel">

      <div class="panel-heading level">
        <div class="level-left">
          <p class="level-item">
          <i class="material-icons has-text-primary	">
                menu
            </i>
          </p>
        </div>
        <div class="level-item has-text-centered">
          <p class="subtitle">
            Settings
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
      </div>

      <a class="panel-block" @click="toggleDevTools" :class="{'is-active': devToolsOpen }">
          <span class="panel-icon">
            <i class="material-icons" v-if="devToolsOpen">
                remove_circle
            </i>
            <i class="material-icons" v-if="!devToolsOpen">
                add_circle
            </i>
          </span>
          Dev Tools
      </a>
    </nav>

    <!-- <fuzzy />
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
    </div> -->
 
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
    height: 100vh;
    background-color: rgba(255, 255, 255, .85);
    font-weight: bold;
  }

  .panel {
    height: 100%;
  }
  .panel-icon {
    width: 2em;
    height: 1.5em;
  }
</style>