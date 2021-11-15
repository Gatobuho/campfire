<script setup lang="ts">
import * as pokeData from '@/logic/pokes2.json'

const pokes = pokeData.default
</script>

<template>
  <main>
    <section class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <mon-card v-for="mon in pokes" :key="mon.name + mon.id" :mon="mon" />
    </section>
  </main>
</template>

<style scoped>
</style>
