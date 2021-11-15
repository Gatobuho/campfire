<script setup lang="ts">
import { Pokemon, Trainer, Pokedex, classes } from '@/types'
import * as pokeData from '@/logic/pokes2.json'
const activeName = ref('first')
const pokedex: Ref<Pokedex> = ref({
  trainer: {},
  party: [],
  money: 0,
  badges: [],
  bag: [],
})
const trainerClasses = { ...classes }
// const trainerClasses = [
//   'Ace Trainer',
//   'Backpacker',
//   'Beauty',
//   'Biker',
//   'Bird Keeper',
//   'Black Belt',
//   'Breeder',
//   'Bug Catcher',
//   'Burglar',
//   'Channeler',
//   'Chef',
//   'Dragon Tamer',
//   'Fisherman',
//   'Gambler',
//   'Juggler',
//   'Lass',
//   'Youngster',
//   'Musician',
//   'Pokefan',
//   'Pokemaniac',
//   'Psychic',
//   'Sage',
//   'Scientist',
//   'Surfer',
//   'Custom',
// ]
const trainer: Ref<Trainer> = ref({
  id: 0,
  name: 'Pancho',
  img: 'https://archives.bulbagarden.net/media/upload/thumb/b/b5/VSAlder.png/120px-VSAlder.png',
  class: null,
  stats: {
    body: {
      health: 1,
      brawn: 1,
      swiftness: 1,
      defence: 1,
    },
    mind: {
      sense: 1,
      wisdom: 1,
      smarts: 1,
      nerve: 1,
    },
    soul: {
      charm: 1,
      confidence: 1,
      intuition: 1,
      luck: 1,
    },
  },
})
// const pokemons: Pokemon[] = [
//   {
//     name: 'Bulbasaur',
//     id: 1,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
//     type: 'grass',
//   },
//   {
//     name: 'Charmander',
//     id: 4,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
//     type: 'fire',
//   },
//   {
//     name: 'Squirtle',
//     id: 7,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
//     type: 'water',
//   },
//   {
//     name: 'Pikachu',
//     id: 25,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
//     type: 'electric',
//   },
//   {
//     name: 'Eevee',
//     id: 133,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
//     type: 'normal',
//   },
//   {
//     name: 'Jigglypuff',
//     id: 39,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
//     type: 'normal',
//   },
//   {
//     name: 'Mew',
//     id: 151,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
//     type: 'psychic',
//   },
//   {
//     name: 'Mewtwo',
//     id: 150,
//     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
//     type: 'psychic',
//   },
// ]
console.log(pokeData)
const canNFC = ref(true)
const NFCMsg = ref('')

if ('NDEFReader' in window) {
  canNFC.value = true
  console.log(window.NDEFReader)
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
    NFCMsg.value = JSON.stringify({ ...pokedex.value })
    await sleep(2500)

    const record = [{
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify({ ...pokedex.value })),
    }]

    NFCMsg.value = record
    await sleep(2500)

    await ndefReader.write({ records: record }, { overwrite: true })
    NFCMsg.value = `Wrote -${JSON.stringify(record)}`
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
  pokedex.value.party.push(pokemon)
}
const removePokemon = (pokemon: Pokemon) => {
  pokedex.value.party = pokedex.value.party.filter(p => p.id !== pokemon.id)
}
const addTrainer = () => {
  pokedex.value.trainer = { ...trainer.value }
}
</script>

<template>
  <main>
    <div class="max-w-4xl mx-auto">
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
      <!-- A basic anchor icon from Phosphor icons -->
      <div class="i-ph-anchor-simple-thin" />
      <!-- An orange alarm from Material Design Icons -->
      <div class="i-mdi-alarm text-orange-400" />
      <!-- A large Vue logo -->
      <div class="i-logos-vue text-3xl" />
      <!-- Sun in light mode, Moon in dark mode, from Carbon -->
      <button class="i-carbon-sun dark:i-carbon-moon" />
      <!-- Twemoji of laugh, turns to tear on hovering -->
      <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Trainer" name="first">
          <el-select v-model="trainer.class" filterable placeholder="Select">
            <el-option
              v-for="tCls in trainerClasses"
              :key="tCls"
              :label="tCls"
              :value="tCls"
            >
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">
          Config
        </el-tab-pane>
        <el-tab-pane label="Role" name="third">
          Role
        </el-tab-pane>
        <el-tab-pane label="Task" name="fourth">
          Task
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>
