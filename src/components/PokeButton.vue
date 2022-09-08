<script setup lang="ts">
interface Props {
    title?: string,
}
const props = defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <button class="bg-red-500 text-white font-bold p-3 ml-3 rounded-md shadow-md" @click="$emit('click')">
    <slot>
      {{props.title}}
    </slot>
  </button>
</template>