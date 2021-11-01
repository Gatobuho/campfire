<script setup lang="ts">
import { Ref } from 'vue'
import { Pokemon, Pokedex, Trainer } from '~/types/index.ts'
import { useNFC } from '~/logic/useNFC'

const canNFC = useNFC()
const NFCMsg = ref('')
const reader = new NDEFReader()
const encoder = new TextEncoder()

const pokedex: Ref<Pokedex> = ref({})
const pokemons: Ref<Pokemon[]> = ref([])

const writeNFC = async() => {
  NFCMsg.value = 'Preparing to write'
  try {
    NFCMsg.value = pokedex.value
    NFCMsg.value = JSON.stringify({ ...pokedex.value })

    const record = [{
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify({ ...pokedex.value })),
    }]

    NFCMsg.value = JSON.stringify(record)

    await reader.write({ records: record }, { overwrite: true })
    NFCMsg.value = `Wrote -${record}`
  }
  catch (error) {
    NFCMsg.value = `ERROR:::${error}`
  }
}

const readAllNFC = async() => {
  const decoder = new TextDecoder()
  NFCMsg.value = 'Scaning...'
  const ndef = new NDEFReader()
  await ndef.scan()
  ndef.addEventListener('reading', ({ message, serialNumber }) => {
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
  })
}

const { t } = useI18n()

</script>

<template>
  <main>
    <h1 class="text-4xl mb-8">
      <strong class="font-bold">NFC</strong>
      <span class="text-2xl">Dex</span>
    </h1>
    <nav v-if="canNFC" class="flex justify-center items-center gap-4 flex-wrap">
      <button class="rounded border px-6 py-2" @click="writeNFC()">
        Write
      </button>
      <button class="rounded border px-6 py-2" @click="readAllNFC()">
        Read All
      </button>
    </nav>
    <div v-else>
      <em class="text-sm opacity-75">{{ t('no-nfc') }}</em>
    </div>
    <section>
      <input type="text" name="trainerName" placeholder="Entrenado 1">
    </section>
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>

<route lang="yaml">
meta:
  layout: NFCdex
</route>
