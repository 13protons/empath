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

    <!-- <fuzzy /> -->
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

    <button class="button is-warning is-fullwidth" @click="clear">Clear All</button>
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
    padding: .5em 1em;
  }
  nav {
    border-bottom: 2px solid #eee;
  }
  small.desc {
    display: block;
    color: #aaa;
    font-size: .8em;
    margin: 1em 0;
  }
</style>