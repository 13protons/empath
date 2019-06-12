<template>
  <div id="A11y">
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item">
        <i class="material-icons">
              accessibility
          </i>
        </p>
      </div>
      <div class="level-item has-text-centered">
        <p class="subtitle">
          Accessibility
        </p>
      </div>
      <div class="level-right">
        <p class="level-item">
          <button class="button is-white has-text-right" @click="closePanel">
            <i class="material-icons">
              close
            </i>
          </button>
        </p>
      </div>
    </nav>

    <!-- <fuzzy /> -->
    <div id="controls">
      <div v-for="item in list" :key="item.id" class="action">
        <h3>{{item.title}} - {{item.id}}</h3>
        <small class="desc">{{item.description}}</small>

        <button v-for="control in item.controls"
                :key="control.id"
                @click="toggle(control.id)"
                class="button"
                :class="{'is-primary': contains(control.id)}">
          Toggle: &nbsp; {{control.label}}
        </button>
        <hr/>
      </div>

      <div class="action">
        <h3>Audio Alteration</h3>
        <small class="desc">Change the page volume</small>

        <button class='button is-success' @click='setVolume(1)'>No Hearing Loss</button>
        <button class='button is-warning' @click='setVolume(.2)'>Mild Hearing Loss</button>
        <button class='button is-warning' @click='setVolume(.05)'>Moderate Hearing Loss</button>
        <button class='button is-danger' @click='setVolume(.01)'>Severe Hearing Loss</button>

        <hr/>
      </div>
    </div>
    <div id="reset">
      <button class="button is-warning is-fullwidth" @click="clear">Clear All</button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import EventBus from '@/EventBus';
  // import Fuzzy from './A11y/Fuzzy.vue';

  export default {
    name: 'A11y',
    computed: {
      ...mapGetters(['isPanelOpen', 'list', 'active'])
    },
    methods: {
      ...mapActions(['closePanel', 'toggle', 'clear']),
      contains(id) {
        return this.active.indexOf(id) > -1;
      },
      setVolume(newVolume) {
        EventBus.$emit('setVolume', newVolume);
      }
    },
    components: {
      // Fuzzy
    }
  };
</script>

<style lang="scss" >
  #A11y {
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
  #reset {
    border-top: 2px solid #eee;
    padding-top: .5em;
    max-height: 3.6em;
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