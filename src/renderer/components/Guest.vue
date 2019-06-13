<template>
  <div class="guest">
    <img src="/static/assets/arrow_cursor.png" id='cursor_img' v-if="parkinsonsActive" :style="cursorStyle"/>
    <webview id="guest" autosize ref="guest" :preload="preload" :src="url"></webview>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
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
        defaultSrc: 'http://localhost:5000/static/',
        cursorX: 0,
        cursorY: 0,
        parkinsonsActive: false,
        webviewIsInteractive: false
      };
    },
    computed: {
      ...mapGetters(['url', 'active', 'devToolsOpen']),
      styleObject() {
        return {
          filter: this.active.reduce((acc, item) =
          
          
         (`${acc} url(#${item}) `), '')
        };
      },
      cursorStyle() {
        return {
          top: this.cursorY + "px",
          left: this.cursorX + "px",
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
      }
    },
    methods: {
      ...mapActions(['goHome']),
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
      simParkinsons(param) {
        if (param) {
          this.parkinsonsActive = true;
          this.$refs.guest.executeJavaScript('document.body.style.cursor = "none";')

          this.startTrackingCursor();
        } else {
          this.parkinsonsActive = false;
          this.stopTrackingCursor();
        }
      },
      setDevTools(bool) {
        if (bool) {
          this.$refs.guest.openDevTools();
        } else {
          this.$refs.guest.closeDevTools();
        }
      },
      startTrackingCursor() {
        document.addEventListener("mousemove", this.handleCursorMove);
      },
      stopTrackingCursor() {
        document.removeEventListener("mousemove", this.handleCursorMove);
      },
      handleCursorMove(e) {
        let xshift = this.getRandomInt(-10, 10);
        let yshift = this.getRandomInt(-10, 10);

        this.cursorX = e.clientX + xshift;
        this.cursorY = e.clientY + yshift;
      },
      getRandomInt(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
      },
    },
    mounted() {
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
        this.webviewIsInteractive = true;
      });

      EventBus.$on('back', this.back);
      EventBus.$on('setVolume', this.setVolume);
      EventBus.$on('simParkinsons', this.simParkinsons);
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

#cursor_img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 102;
  height: 16px;
  width: 16px;
}
</style>