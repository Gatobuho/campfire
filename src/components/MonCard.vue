<script setup lang='ts'>
import { useCapitalize } from '@/logic/useCapitalize'
const { t } = useI18n()
defineProps({
  mon: Object,
})

const filterEmpty = (obj: any) => {
  const keys = Object.keys(obj)
  return keys.reduce((acc: any, key) => {
    if (obj[key])
      acc[key] = obj[key]

    return acc
  }, {})
}

const onlyOficialArt = (sprites: any) => {
  return sprites.official_artwork
}

const hightToMeters = (height: number): string => {
  return `${(height / 10)}m`
}
const weightToKg = (weight: number): string => {
  return `${(weight / 10)}kg`
}
</script>

<template>
  <article class="bg-gray-700 rounded p-4">
    <h2 class="font-bold text-xl text-gray-300">
      {{ useCapitalize(mon.name) }}
    </h2>
    <dl class="grid grid-cols-2 gap-2">
      <dt>Peso</dt>
      <dd class="font-bold">
        {{ weightToKg(mon.weight) }}
      </dd>
      <dt>Altura</dt>
      <dd class="font-bold">
        {{ hightToMeters(mon.height) }}
      </dd>
    </dl>
    <span class="flex gap-4">
      <img v-for="{ name } in mon.types" :key="name" :src="`/images/types/${useCapitalize(name)}.png`" :alt="`${t('mon.type_desc')} ${name}`" class="w-10">
    </span>
    <div class="flex flex-wrap gap-3">
      <img :src="mon.sprites.official_artwork" alt="official_artwork" class="w-20">
      <!-- <img v-for="(sprite, key) in filterEmpty(mon.sprites)" :key="key" :src="sprite" :alt="key" class="w-20"> -->
    </div>
    <dl class="grid grid-cols-2 gap-2">
      <template v-for="{ short_name, base_stat, name } in mon.stats" :key="name + base_stat">
        <dt>{{ short_name }}</dt>
        <dd class="font-bold">
          {{ base_stat }}
        </dd>
      </template>
    </dl>
    <div v-for="{ is_hidden, name, url } in mon.abilities" :key="name + url" class="flex items-center group gap-x-2">
      <span v-if="is_hidden" class="i-ic:round-hide-source"></span>
      <a :href="url">{{ useCapitalize(name) }}</a>
      <span class="i-ic:round-link w-4 opacity-0 transform transition duration-150 ease-in-out -translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0"></span>
    </div>
    <details>
      <summary>{{ t('mon.moves') }}</summary>
      <ul>
        <li v-for="{ name, url } in mon.moves" :key="name + url">
          <a :href="url">{{ name }}</a>
        </li>
      </ul>
    </details>
  </article>
</template>
