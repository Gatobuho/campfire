<script setup lang="ts">
import { Trainer, TrainerClasses, defaultTrainer } from '@/types/poke.ts'
const { t } = useI18n()
useHead({
  title: 'New Player',
  meta: [
    {
      name: 'description',
      content: 'Create a new player',
    },
  ],
})

const trainerClasses = TrainerClasses
const newPlayer: Trainer = ref({ ...defaultTrainer })
const getDynamicImg = (name: string) => {
  return `/images/trainers/${name}`
}

const setAtt = ({ statName, attName, value }) => {
  newPlayer.value.stats[statName][attName] = value
}
</script>

<template>
  <main>
    <div class="max-w-4xl mx-auto py-6">
      <h1 class="p-6 text-2xl font-bold">
        {{ t('player.new') }}
      </h1>
      <section class="space-y-2">
        <label class="flex flex-col max-w-xs">
          <span class="text-sm font-extrabold pb-1">{{ t('player.name') }}</span>
          <input v-model="newPlayer.name" type="text" class="rounded-full px-3 py-1 text-gray-800" placeholder="Player Name" />
        </label>
        <label class="flex flex-col max-w-xs">
          <span class="text-sm font-extrabold pb-1">{{ t('player.image') }}</span>
          <img :src="getDynamicImg(newPlayer.img)" :alt="`${newPlayer.name}'s Portrait`" class="bg-gray-100 rounded-lg border-2 border-teal-600 w-24 h-24 object-cover">
          <input v-show="false" v-model="newPlayer.img" type="text" />
        </label>
        <label class="flex flex-col max-w-xs">
          <span class="text-sm font-extrabold pb-1">{{ t('player.class') }}</span>
          <select v-model="newPlayer.class" class="rounded-full px-3 py-1 text-gray-800">
            <option v-for="tc in trainerClasses" :key="tc">
              {{ tc }}
            </option>
          </select>
        </label>
        <article v-for="(stat, statName) in newPlayer.stats" :key="statName">
          <h2 class="text-sm font-extrabold pb-1 capitalize">
            {{ statName }}
          </h2>
          <dl class="flex gap-4">
            <div v-for="(att, attName) in stat" :key="statName + attName">
              <dt>{{ attName }}</dt>
              <dd>
                <span v-for="(val, i) in 6" :key="val + i" class="cursor-pointer hover:opacity-75" @click="setAtt({statName, attName, value: i + 1})">
                  {{ i < att ? '█' : '■' }}
                </span>
                {{ att }}
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  </main>
</template>
