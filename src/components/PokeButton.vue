<script setup lang="ts">
// https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
interface Props {
    title?: string,
}
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps<Props>()

// https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
// https://vuejs.org/guide/components/events.html#declaring-emitted-events
defineEmits(['click'])
</script>

<template>
  <button class="bg-red-500 text-white font-bold p-3 ml-3 rounded-md shadow-md" @click="$emit('click')">
    <slot>
      {{props.title}}
    </slot>
  </button>
</template>