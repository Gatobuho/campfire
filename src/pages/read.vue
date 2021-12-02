<script setup lang="ts">
useTitle('Read - NFCmon')
const canNFC = ref(true)
const NFCMsg = ref('')
const state = useStorage('trainer', {})

const readAllNFC = async() => {
  const decoder = new TextDecoder()
  NFCMsg.value = 'Scaning...'
  const ndef = new NDEFReader()
  await ndef.scan()
  ndef.addEventListener('reading', ({ message, serialNumber }) => {
    NFCMsg.value = `-${serialNumber}:_`

    for (const record of message.records) {
      NFCMsg.value = '--------'
      NFCMsg.value += record.recordType
      NFCMsg.value += `
      -
      `
      switch (record.recordType) {
        case 'text':
          NFCMsg.value += `Text: ${decoder.decode(record.data)} (${record.lang})`
          break
        case 'url':
          NFCMsg.value += `URL: ${decoder.decode(record.data)}`
          break
        case 'mime':
          if (record.mediaType === 'application/json')
            NFCMsg.value += `JSON: ${(decoder.decode(record.data))}`
          else
            NFCMsg.value += 'Media not handled'
          break
        default:
          NFCMsg.value += 'Record not handled'
      }
    }

    state.value[serialNumber] = NFCMsg.value
  })
}

if (typeof window !== 'undefined' && window && 'NDEFReader' in window) {
  canNFC.value = true
  readAllNFC()
}

const { t } = useI18n()
</script>

<template>
  <main>
    <div class="max-w-4xl mx-auto">
      <p class="text-4xl mb-8">
        <strong class="font-bold">NFC</strong>
        <span class="text-2xl">Dex</span>
      </p>
      <div v-if="canNFC" class="flex justify-center items-center gap-4 flex-wrap">
      </div>
      <div v-else>
        <em class="text-sm opacity-75">{{ t('no-nfc') }}</em>
        <em class="text-sm opacity-75">{{ t('intro.dynamic-route') }}</em>
      </div>

      <div class="m-4">
        {{ NFCMsg }}
      </div>
      <div class="m-4">
        <pre lang="json">
          {{ JSON.stringify(state) }}
        </pre>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>
