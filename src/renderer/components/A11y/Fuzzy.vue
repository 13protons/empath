<template>
  <div id="fuzzy" class="action">
    <button @click="toggle">Toggle Blur</button>
  </div>
</template>

<script>
  import EventBus from '@/EventBus';

  export default {
    name: 'Fuzzy',
    methods: {
      toggle() {
        EventBus.$emit('toggleBlur');
      }
    }
  };
</script>

<style></style>