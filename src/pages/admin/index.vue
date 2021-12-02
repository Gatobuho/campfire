<script setup lang="ts">
import { Pokemon, Trainer, Pokedex } from '@/types'
const activeName = ref('trainer')
const activeAcordion = ref('trainer')
const trainer: Trainer = ref({
  id: 0,
  name: 'Pancho',
  img: 'Trainer_88',
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
const pokedex: Pokedex = ref({
  trainer,
  party: [],
  money: 0,
  badges: [],
  bag: [],
})
// const trainerClasses = { ...classes }
const trainerClasses = [
  'Ace Trainer',
  'Backpacker',
  'Beauty',
  'Biker',
  'Bird Keeper',
  'Black Belt',
  'Breeder',
  'Bug Catcher',
  'Burglar',
  'Channeler',
  'Chef',
  'Dragon Tamer',
  'Fisherman',
  'Gambler',
  'Juggler',
  'Lass',
  'Youngster',
  'Musician',
  'Pokefan',
  'Pokemaniac',
  'Psychic',
  'Sage',
  'Scientist',
  'Surfer',
  'Custom',
]

const canNFC = ref(false)
const NFCMsg = ref('')

if (typeof window !== 'undefined' && window && 'NDEFReader' in window) {
  canNFC.value = true
  console.log(window.NDEFReader)
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

const handleClick = (e) => {
  console.log(e)
}
</script>

<template>
  <main>
    <section class="max-w-300 mx-auto px-8">
      <div v-if="canNFC" class="flex justify-center items-center gap-4 flex-wrap">
        <em class="text-sm opacity-75">{{ t('nfc-able') }}</em>
      </div>
      <div v-else class="w-full text-center">
        <em class="text-sm opacity-75">{{ t('no-nfc') }}</em>
      </div>

      <el-tabs v-model="activeName" class="text-white" @tab-click="handleClick">
        <el-tab-pane label="Trainer" name="trainer">
          <el-select v-model="trainer.class" filterable placeholder="Select">
            <el-option
              v-for="tCls in trainerClasses"
              :key="tCls"
              :label="tCls"
              :value="tCls"
            >
            </el-option>
          </el-select>
          <el-collapse v-model="activeAcordion" accordion class="text-white">
            <el-collapse-item name="pokedex">
              <template #title>
                <h2 class="font-bold text-xl  px-2">
                  Pokedex
                </h2>
              </template>
              <div v-for="(value, key) in pokedex" :key="key" class="px-4 mb-2 font-bold">
                {{ key }}: {{ value }}
              </div>
            </el-collapse-item>
            <el-collapse-item name="trainer">
              <template #title>
                <h2 class="font-bold text-xl  px-2">
                  Trainer
                </h2>
              </template>
              <el-form ref="form" :model="trainer" label-width="120px">
                <el-form-item v-for="(value, key) in trainer" :key="key" :label="key">
                  <el-input v-model="trainer[key]">
                    {{ value }}
                  </el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="Config" name="config">
          Config
        </el-tab-pane>
        <el-tab-pane label="Role" name="role">
          Role
        </el-tab-pane>
        <el-tab-pane label="Task" name="task">
          Task
        </el-tab-pane>
      </el-tabs>
    </section>
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>
