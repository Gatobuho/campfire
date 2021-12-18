<script setup lang="ts">
fetch('/api/hello')
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then(json => console.log(json))
const { t } = useI18n()
</script>

<template>
  <section class="grid grid-minmax-15rem gap-4 max-w-300 mx-auto">
    <router-link to="/blogs/main" class="rounded bg-gradient-to-tr from-rose-400 to-rose-500 dark:from-indigo-400 dark:to-indigo-300 h-20 shadow-xl shadow-rose-500/50 dark:shadow-indigo-500/75 text-rose-900 dark:text-indigo-50 px-4 pt-3">
      <h2 class="text-xl font-bold">
        Articulo
      </h2>
      <p> Un pequeño articulo de prueba</p>
    </router-link>
    <button
      class="btn m-3 text-sm mt-8"
      @click="router.back()"
    >
      {{ t('button.back') }}
    </button>
    <div v-for="i in 10" :key="i" class="rounded bg-gradient-to-tr from-rose-400 to-rose-500 dark:from-indigo-400 dark:to-indigo-300 h-20 shadow-xl shadow-rose-500/50 dark:shadow-indigo-500/75" />
  </section>
</template>
