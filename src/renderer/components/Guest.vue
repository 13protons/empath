<template>
  <div class="guest" :style="styleObject">
    <webview id="guest" ref="guest" src="http://github.com"></webview>
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
      ...mapGetters(['url']),
      styleObject() {
        return {
          filter: `url(#${this.filter})`
        };
      }
    },
    watch: {
      // whenever question changes, this function will run
      url(url, oldUrl) {
        if (url !== oldUrl) {
          this.address = url;
          this.$refs.guest.loadURL(url);
        }
      }
    },
    methods: {
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

      EventBus.$on('back', this.back);
      EventBus.$on('applyFilter', this.setFilterId);
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