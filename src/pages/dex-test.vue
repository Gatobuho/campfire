<script setup lang="ts">
interface Pokemon {
  name: string
  id: number
  img: string
  type: string
}
const pokedex: Ref<Pokemon[]> = ref([])

const pokemons: Pokemon[] = [
  {
    name: 'Bulbasaur',
    id: 1,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    type: 'grass',
  },
  {
    name: 'Charmander',
    id: 4,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    type: 'fire',
  },
  {
    name: 'Squirtle',
    id: 7,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    type: 'water',
  },
  {
    name: 'Pikachu',
    id: 25,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    type: 'electric',
  },
  {
    name: 'Eevee',
    id: 133,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
    type: 'normal',
  },
  {
    name: 'Jigglypuff',
    id: 39,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
    type: 'normal',
  },
  {
    name: 'Mew',
    id: 151,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
    type: 'psychic',
  },
  {
    name: 'Mewtwo',
    id: 150,
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    type: 'psychic',
  },
]

const canNFC = ref(true)
const NFCMsg = ref('')

const isOnDex = (PokeId: number) => {
  const dex = pokedex.value
  return dex.find((p: Pokemon) => p.id === PokeId)
}

if ('NDEFReader' in window) {
  canNFC.value = true
  console.log(window.NDEFReader)
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const writeNFCText = async() => {
  NFCMsg.value = 'Preparing to write'
  try {
    const ndefReader = new NDEFReader()
    NFCMsg.value = ndefReader
    await sleep(2500)

    const record = {
      recordType: 'text',
      data: 'Pancho',
    }

    NFCMsg.value = record
    await sleep(2500)

    await ndefReader.write({ records: [record] })
    NFCMsg.value = `Wrote -${JSON.stringify(record)}`
  }
  catch (error) {
    NFCMsg.value = `ERROR:::${error}`
  }
}
const writeNFCURL = async() => {
  NFCMsg.value = 'Preparing to write'
  try {
    const ndefReader = new NDEFReader()
    const encoder = new TextEncoder()
    NFCMsg.value = pokedex.value
    await sleep(2500)
    NFCMsg.value = JSON.stringify({ dex: pokedex.value })
    await sleep(2500)

    const record = [{
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify({ name: pokemons[0].name, id: pokemons[0].id, img: pokemons[0].img, type: pokemons[0].type })),
    }]

    NFCMsg.value = record
    await sleep(2500)

    await ndefReader.write({ records: record }, { overwrite: true })
    NFCMsg.value = `Wrote -${record}`
  }
  catch (error) {
    NFCMsg.value = `ERROR:::${error}`
  }
}
const writeNFC = async() => {
  NFCMsg.value = 'Preparing to write'
  try {
    const ndefReader = new NDEFReader()
    const encoder = new TextEncoder()
    NFCMsg.value = pokedex.value
    await sleep(2500)
    NFCMsg.value = JSON.stringify({ dex: pokedex.value })
    await sleep(2500)

    const record = [{
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify({ dex: pokedex.value })),
    }]

    NFCMsg.value = record
    await sleep(2500)

    await ndefReader.write({ records: record }, { overwrite: true })
    NFCMsg.value = `Wrote -${record}`
  }
  catch (error) {
    NFCMsg.value = `ERROR:::${error}`
  }
}
const readNFC = async() => {
  try {
    const ndef = new NDEFReader()
    await ndef.scan()
    NFCMsg.value = 'Scaning...'
    ndef.addEventListener('reading', ({ message, serialNumber }) => {
      NFCMsg.value = `${serialNumber}: ${JSON.stringify(message.records, null, 2)}`
    })
  }
  catch (error) {
    NFCMsg.value = `Error! Scan failed to start: ${error}.`
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

const addPokemon = (pokemon: Pokemon) => {
  pokedex.value.push(pokemon)
  console.log(`Added ${pokemon.name}`)
  console.log('Your Dex')
  console.log(pokedex.value)
}
</script>

<template>
  <div>
    <p class="text-4xl mb-8">
      <strong class="font-bold">NFC</strong>
      <span class="text-2xl">Dex</span>
    </p>
    <div v-if="canNFC" class="flex justify-center items-center gap-4 flex-wrap">
      <button class="rounded border px-6 py-2" @click="writeNFC()">
        Write
      </button>
      <button class="rounded border px-6 py-2" @click="writeNFCURL()">
        Buba!
      </button>
      <button class="rounded border px-6 py-2" @click="readNFC()">
        Read
      </button>
      <button class="rounded border px-6 py-2" @click="readAllNFC()">
        Read All
      </button>
    </div>
    <div v-else>
      <em class="text-sm opacity-75">{{ t('no-nfc') }}</em>
    </div>

    <div class="m-4">
      {{ NFCMsg }}
    </div>

    <section class="grid gap-4 max-w-2xl mx-auto dex-grid">
      <article v-for="pokemon in pokemons" :key="pokemon.id" class="bg-gray-200 dark:bg-gray-800 rounded">
        <small class="rounded-full p-2 text-xs opacity-50">{{ isOnDex(pokemon.id) ? 'Owned' : null }} {{ pokemon.id }}</small>
        <h2>{{ pokemon.name }}</h2>
        <img class="w-24 h-24 mx-auto" :src="pokemon.img" alt="{{ pokemon.name }}" />
        <p>{{ pokemon.type }}</p>
        <button class="rounded-full bg-red-600 text-white border-2 border-white hover:shadow hover:bg-red-400 px-3 py-1 my-2" @click="addPokemon(pokemon)">
          Add to Dex
        </button>
      </article>
    </section>
    <!-- <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div> -->
  </div>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>

<route lang="yaml">
meta:
  layout: home
</route>
