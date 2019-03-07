<template>
  <div class="guest" :class="{
    blur: isBlurry
  }">
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
        isBlurry: false
      };
    },
    computed: {
      ...mapGetters(['url'])
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
      back() {
        this.$refs.guest.goBack();
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
        console.log('nav started', data.url);
        this.$store.dispatch('visit', data.url);
      });
      EventBus.$on('back', this.back);
      EventBus.$on('toggleBlur', () => {
        this.isBlurry = !this.isBlurry;
      });
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

#guest {
  height: 100%;
  width: 100%;
}
</style>