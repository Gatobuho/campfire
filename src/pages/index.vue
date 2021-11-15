<script setup lang="ts">

const canNFC = ref(true)
const NFCMsg = ref('')

if ('NDEFReader' in window) {
  canNFC.value = true
  console.log(window.NDEFReader)
}

const { t } = useI18n()

</script>

<template>
  <main>
    
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>
