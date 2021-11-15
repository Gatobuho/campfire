<script setup lang="ts">
useTitle('Write - NFCmon')
const canNFC = ref(true)
const NFCMsg = ref('')
const pokedex = ref({})

const writeNFC = async() => {
  NFCMsg.value = 'Preparing to write'
  try {
    const ndefReader = new NDEFReader()
    const encoder = new TextEncoder()
    NFCMsg.value = pokedex.value
    NFCMsg.value = JSON.stringify({ ...pokedex.value })
    const record = [{
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify({ ...pokedex.value })),
    }]

    NFCMsg.value = record
    await ndefReader.write({ records: record }, { overwrite: true })
    NFCMsg.value = `Wrote -${JSON.stringify(record)}`
  }
  catch (error) {
    NFCMsg.value = `ERROR:::${error}`
  }
}

if ('NDEFReader' in window) {
  canNFC.value = true
  writeNFC()
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
      <details>
        <summary>Trainer</summary>
        <section class="flex flex-col gap-4">
          <div v-for="(value, key) in trainer" :key="key">
            <label v-if="key !== 'stats'" :for="key" class="flex flex-col">
              <span class="font-bold mb-2"> {{ key }} </span>
              <input class="rounded dark:bg-gray-800 px-2" type="text" :value="value">
              <img v-if="key === 'img'" :src="value" :alt="trainer.name" class="w-20">
            </label>
            <section v-if="key === 'stats'" :for="key" class="flex flex-col">
              <span class="font-bold mb-2"> {{ key }} </span>
              <h2>Body</h2>
              <div v-for="(level, name) in value.body" :key="name">
                {{ name }} : {{ level }}
              </div>
              <h2>Mind</h2>
              <div v-for="(level, name) in value.mind" :key="name">
                {{ name }} : {{ level }}
              </div>
              <h2>Soul</h2>
              <div v-for="(level, name) in value.soul" :key="name">
                {{ name }} : {{ level }}
              </div>
            </section>
          </div>
        </section>
        <button @click="addTrainer">
          add Trainer
        </button>
      </details>
      <details>
        <summary>Class</summary>
        <select id="" name="" class="rounded dark:bg-gray-800 px-2">
          <option v-for="ct in trainerClasses" :key="ct" value="">
            {{ ct }}
          </option>
        </select>
      </details>
      <details>
        <summary>Party</summary>
        <section class="grid gap-4 max-w-2xl mx-auto dex-grid mb-2">
          <article v-for="pokemon in pokedex.party" :key="pokemon.id" class="bg-indigo-200 dark:bg-indigo-800 rounded">
            <h2>{{ pokemon.name }}</h2>
            <img class="w-24 h-24 mx-auto" :src="pokemon.img" alt="{{ pokemon.name }}" />
            <button class="rounded-full bg-red-600 text-white border-2 border-white hover:shadow hover:bg-red-400 px-3 py-1 my-2" @click="removePokemon(pokemon)">
              Release
            </button>
          </article>
        </section>
      </details>
      <details>
        <summary>Wild Pokemons</summary>
        <section class="grid gap-4 max-w-2xl mx-auto dex-grid">
          <article v-for="pokemon in pokemons" :key="pokemon.id" class="bg-gray-200 dark:bg-gray-800 rounded">
            <small class="rounded-full p-2 text-xs opacity-50">{{ pokemon.id }}</small>
            <h2>{{ pokemon.name }}</h2>
            <img class="w-24 h-24 mx-auto" :src="pokemon.img" alt="{{ pokemon.name }}" />
            <p>{{ pokemon.type }}</p>
            <button class="rounded-full bg-red-600 text-white border-2 border-white hover:shadow hover:bg-red-400 px-3 py-1 my-2" @click="addPokemon(pokemon)">
              Add to Dex
            </button>
          </article>
        </section>
      </details>
    </div>
  </main>
</template>

<style scoped>
  .dex-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
</style>

<route lang="yaml">
meta:
  layout: home
  isAuth: true
</route>
