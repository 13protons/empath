<template>
  <div id="fuzzy" class="action">
    <button @click="toggle" class="button">Add Astigmatism</button>
  </div>
</template>

<script>
  import EventBus from '@/EventBus';

  export default {
    name: 'Fuzzy',
    methods: {
      toggle() {
        EventBus.$emit('applyFilter', 'astigmatism');
      }
    }
  };
</script>

<style></style>