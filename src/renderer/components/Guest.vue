<template>
  <div class="guest" :style="styleObject">
    <webview id="guest" ref="guest" preload='file:///Users/bwise/code/empath/src/renderer/preload.js' src="https://www.youtube.com/watch?v=PbBZjT7nuoA"></webview>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EventBus from '@/EventBus';

  export default {
    name: 'Guest',
    data() {
      return {
        isBlurry: false,
        filter: ''
      };
    },
    computed: {
      ...mapGetters(['url', 'active']),
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
          this.$refs.guest.send("set-volume", param);
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