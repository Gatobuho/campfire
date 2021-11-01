<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('not-found') }}</h1>
    <router-link to="/">
      {{ t('back-to-home') }}
    </router-link>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
