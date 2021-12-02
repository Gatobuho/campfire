<script setup lang='ts'>
defineProps({
  source: String,
  description: String,
})
</script>

<template>
  <img :src="source" :alt="description" />
</template>

<style scoped>
    img {
        object-fit: cover;
    }
</style>
