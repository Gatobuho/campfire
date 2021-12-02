<script setup lang="ts">
const canNFC = ref(false)
const NFCMsg = ref('')
const useNFC = () => {
  if (typeof window !== 'undefined' && window && 'NDEFReader' in window) {
    canNFC.value = true
    console.log('NFC is supported')
  }
}
fetch('/api/hello')
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then(json => console.log(json))
useNFC()
</script>

<template>
  <!-- <div class="upper w-full bg-gray-600 border-b-2 border-gray-800 h-50vh fixed inset-x-0 top-0"></div>
  <div class="lowwer w-full bg-gray-600 border-t-2 border-gray-800 h-50vh fixed inset-x-0 bottom-0"></div>
  <div class="core inset-0 fixed flex justify-center items-center">
    <span class="core w-20 h-20 rounded-full bg-blue-400 border-4 border-blue-600 shadow"></span>
  </div> -->
  <main>
    {{ canNFC }}
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>
