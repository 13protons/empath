<template>
  <div id="A11y">
    <nav class="panel">

      <div class="panel-heading level">
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
            <button class="button is-white has-text-right" @click="togglePanel">
              <i class="material-icons">
                close
              </i>
            </button>
          </p>
        </div>
      </div>

      <p class="panel-tabs">
        <a class="is-active">Sight</a>
        <a>Hearing</a>
        <a>Cognition</a>
        <a>Reading &amp; Writing</a>
      </p>

      <a v-for="item in list" :key="item.id" class="panel-block">
        <span class="panel-icon">
          <i class="material-icons">
                filter
          </i>
        </span>

        {{item.title}}
        <!-- <small class="desc">{{item.description}}</small> -->
        <b-switch v-for="control in item.controls"
                :key="control.id"
                v-model="filters[control.id]"
                >{{control.label}} {{filters[control.id]}}</b-switch>
        <!-- <button v-for="control in item.controls"
                :key="control.id"
                @click="toggle(control.id)"
                class="button"
                :class="{'is-primary': contains(control.id)}">
          Toggle: &nbsp; {{control.label}}
        </button> -->
        
      </a>

      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth" @click="clear">Clear All</button>
      </div>
    </nav>

    <!-- <fuzzy /> -->
    <!-- <div id="controls">
      <h3 class="title">Filters</h3>
      <div v-for="item in list" :key="item.id" class="action">
        <h3>{{item.title}}</h3>
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

      <h3 class="title">Overlays</h3>
      <div v-for="item in overlays" :key="item.id" class="action">
        <h3>{{item.title}}</h3>
        <small class="desc">{{item.description}}</small>

        <button @click="toggleOverlay(item.id)"
                class="button"
                :class="{'is-primary': overlayOn(item.id)}">
          Toggle: &nbsp; {{item.title}}
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
    </div> -->
    <!-- <div id="reset">
      <button class="button is-warning is-fullwidth" @click="clear">Clear All</button>
    </div> -->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import EventBus from '@/EventBus';
  import _ from 'lodash';
  // import Fuzzy from './A11y/Fuzzy.vue';

  export default {
    name: 'A11y',
    data() {
      return {
        filters: {}
      };
    },
    watch: {
      filters: {
        handler(newVal) {
          // sync local state back to store. ugh inputs.
          _.forEach(newVal, (val, key) => {
            if (val !== this.contains(val)) {
              this.toggle(key);
            }
          });
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(['isPanelOpen', 'list', 'active', 'overlays', 'activeOverlay'])
    },
    methods: {
      ...mapActions(['togglePanel', 'toggle', 'clear', 'toggleOverlay']),
      contains(id) {
        return this.active.indexOf(id) > -1;
      },
      overlayOn(id) {
        return this.activeOverlay.id === id;
      },
      setVolume(newVolume) {
        EventBus.$emit('setVolume', newVolume);
      },
      switcher(id) {
        console.log('trying to switch', id);
      }
    },
    components: {
      // Fuzzy
    },
    mounted() {
      this.list.forEach((item) => {
        this.$set(this, 'filters[item.id]', this.contains(item.id) || false);
      });
    }
  };
</script>

<style lang="scss" >
  #A11y {
    height: 100vh;
    background-color: rgba(255, 255, 255, .85);
  }

  .panel {
    height: 100%;
  }
</style>