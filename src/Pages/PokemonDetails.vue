<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup
const route = useRoute()
const pokemonNumber = ref(route.params.id)
</script>

<template>
  <p>
    // https://router.vuejs.org/guide/#javascript
    // ver segundo quadro
    Pokemon: {{$route.params.id}}
  </p>
  <p>ou</p>
  <p>
    Pokemon: {{pokemonNumber}}
  </p>
</template>