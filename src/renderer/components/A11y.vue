<template>
  <div id="A11y">
    <nav class="panel">
      <div class="panel-heading level is-mobile">
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
        <a :class="{'is-active': tab === 0 }" @click="tab = 0">Sight</a>
        <a :class="{'is-active': tab === 1 }" @click="tab = 1">Sound</a>
        <a :class="{'is-active': tab === 3 }" @click="tab = 3">Touch</a>
        <!-- <a :class="{'is-active': tab === 3 }" @click="tab = 3">Read/Write</a> -->
      </p>

      <div v-if="tab === 0">
        <div class="panel-block">
          Color Anomoly
        </div>

        <a v-for="item in list" :key="item.id" class="panel-block">
            <b-switch v-for="control in item.controls"
                  :key="control.id"
                  v-model="filters[control.id]"
                  ></b-switch>
          <!-- <small class="desc">{{item.description}}</small> -->
                  {{item.title}}
        </a>

        <div class="panel-block">
          Obstruction Issues
        </div>

        <a v-for="item in overlays" :key="item.id" class="panel-block">
            <b-switch v-model="overlaysModel[item.id]"
                  ></b-switch>
          <!-- <small class="desc">{{item.description}}</small> -->
                  {{item.title}}
        </a>
        
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" @click="clear">Clear All for Sight</button>
        </div>
      </div>


      <div v-if="tab === 1">
        
        <a class="panel-block" :class="{'is-active': volume === 1 }" @click='setVolume(1)'>
          <span class="panel-icon">
            <i class="material-icons">
                volume_up
            </i>
          </span>
          No Hearing Loss
        </a>
        <a class="panel-block" :class="{'is-active': volume === .2 }" @click='setVolume(.2)'>
          <span class="panel-icon">
            <i class="material-icons">
                volume_down
            </i>
          </span>
          Mild Hearing Loss
        </a>

        <a class="panel-block" :class="{'is-active': volume === .05 }" @click='setVolume(.05)'>
          <span class="panel-icon">
            <i class="material-icons">
                volume_mute
            </i>
          </span>
          Moderate Hearing Loss
        </a>

        <a class="panel-block" :class="{'is-active': volume === .01 }" @click='setVolume(.01)'>
          <span class="panel-icon">
            <i class="material-icons">
                volume_off
            </i>
          </span>
          Severe Hearing Loss
        </a>
      </div>

      <div v-if="tab === 3">
        <a class="panel-block" :class="{'is-active': parkinsonsEnabled === true }" @click='simParkinsons(!parkinsonsEnabled)'>
          <span class="panel-icon">
            <i class="material-icons">
                touch_app
            </i>
          </span>
          Parkinson's
        </a>
      </div>


    </nav>
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
        filters: {},
        overlaysModel: {},
        tab: 0,
        volume: -1,
        parkinsonsEnabled: false,
      };
    },
    watch: {
      filters: {
        handler(newVal) {
          // sync local state back to store. ugh inputs.
          _.forEach(newVal, (val, key) => {
            this.$nextTick(() => {
              if (val !== this.contains(key)) {
                this.toggle(key);
              }
            });
          });
        },
        deep: true
      },
      overlaysModel: {
        handler(newVal) {
          // sync local state back to store. ugh inputs.
          console.log('updated overlay', newVal);
          _.forEach(newVal, (val, key) => {
            this.$nextTick(() => {
              console.log('compare', key, val, this.overlayOn(val));
              if (val !== this.overlayOn(key)) {
                this.toggleOverlay(key);
              }
            });
          });
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(['isPanelOpen', 'list', 'active', 'overlays', 'activeOverlay'])
    },
    methods: {
      ...mapActions(['togglePanel', 'toggle', 'clear', 'toggleOverlay', 'removeOverlays']),
      contains(id) {
        return this.active.indexOf(id) > -1;
      },
      overlayOn(id) {
        console.log('anything on ', id, this.activeOverlay.id === id);
        return this.activeOverlay.id === id;
      },
      setVolume(newVolume) {
        this.volume = newVolume;
        EventBus.$emit('setVolume', newVolume);
      },
      switcher(id) {
        console.log('trying to switch', id);
      },
      simParkinsons(isEnabled) {
        this.parkinsonsEnabled = isEnabled;
        EventBus.$emit('simParkinsons', isEnabled);
      },
      clearAll() {
        this.clear();
        this.removeOverlays();
      }
    },
    components: {
      // Fuzzy
    },
    mounted() {
      this.list.forEach((item) => {
        this.$set(this, 'filters[item.id]', this.contains(item.id) || false);
      });

      this.overlays.forEach((item) => {
        console.log('overlays', item);
        this.$set(this, 'overlaysModel[item.id]', this.overlayOn(item.id) || false);
      });
    }
  };
</script>

<style lang="scss" >
  #A11y {
    height: 100%;
    background-color: rgba(255, 255, 255, .92);
    font-weight: bold;
    overflow: scroll;
  }

  .panel {
    height: 100%;
    max-height: 100%;
    overflow: scroll;
    .panel-heading {
      position: fixed;
      width: 80%;
      max-width: 360px;
      z-index: 1000;
    }
    .panel-tabs {
      margin-top: 4em;
    }
  }
  .panel-icon {
    width: 2em;
    height: 1.5em;
  }
</style>