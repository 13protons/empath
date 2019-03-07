<template>
  <header>
    <address-bar />
    <access />
  </header>
</template>

<script>
  import AddressBar from './AddressBar.vue';
  import Access from './A11y.vue';

  export default {
    components: {
      AddressBar,
      Access
    },
    name: 'Header'
  };
</script>

<style>

</style>