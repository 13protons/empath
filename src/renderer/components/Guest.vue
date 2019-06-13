<template>
  <div class="guest">
    <webview id="guest" ref="guest" :preload="preload" :src="defaultSrc"></webview>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EventBus from '@/EventBus';
  import _ from 'lodash';
  const path = require('path');

  export default {
    name: 'Guest',
    data() {
      return {
        isBlurry: false,
        filter: '',
        preload: 'file://' + path.resolve(__dirname, '../preload.js'),
        defaultSrc: 'http://duckduckgo.com'
      };
    },
    computed: {
      ...mapGetters(['url', 'active', 'devToolsOpen']),
      styleObject() {
        return {
          filter: this.active.reduce((acc, item) => (`${acc} url(#${item}) `), '')
        };
      }
    },
    watch: {
      url(url, oldUrl) {
        if (url !== oldUrl) {
          this.address = url;
          this.$refs.guest.loadURL(url);
        }
      },
      active(active) {
        this.applyFilters(active);
      },
      devToolsOpen(bool) {
        this.setDevTools(bool);
      },
    },
    methods: {
      applyFilters(filters) {
        this.setFilterId(filters[0]);
      },
      setFilterId(data) {
        console.log('setting filter id to ', data);
        this.filter = data;
      },
      back() {
        if (this.$refs.guest.canGoBack()) {
          this.$refs.guest.goBack();
        }
      },
      forward() {
        this.$refs.guest.goForward();
      },
      reload() {
        this.$refs.guest.reload();
      },
      mute() {
        this.$refs.guest.setAudioMuted(true);
      },
      unmute() {
        this.$refs.guest.setAudioMuted(false);
      },
      setVolume(param) {
        if (this.$refs.guest) {
          this.$refs.guest.send('set-volume', param);
        }
      },
      setDevTools(bool) {
        if (bool) {
          this.$refs.guest.openDevTools();
        } else {
          this.$refs.guest.closeDevTools();
        }
      }
    },
    mounted() {
      console.log(this.$refs.guest.loadURL);
      this.$refs.guest.addEventListener('will-navigate', (data) => {
        this.$store.dispatch('visit', data.url);
      });
      this.$refs.guest.addEventListener('did-navigate', (data) => {
        this.$store.dispatch('visit', data.url);
      });

      this.$refs.guest.addEventListener('did-start-loading', () => {
        this.$store.dispatch('startLoading');
      });

      this.$refs.guest.addEventListener('did-stop-loading', () => {
        this.$store.dispatch('stopLoading');
      });

      this.$refs.guest.addEventListener('dom-ready', () => {
        this.setDevTools(this.devToolsOpen);
      });

      EventBus.$on('back', this.back);
      EventBus.$on('setVolume', this.setVolume);
    }
  };
</script>

<style>
.guest {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blur {
  filter: blur(4px);
}

.grayscale {
  filter: grayscale(1);
}

#guest {
  height: 100%;
  width: 100%;
}
</style>