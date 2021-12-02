<script setup lang="ts">
const apiSet = ref(0)
const apiLimit = ref(20)
const apiUrl = computed(() => {
  return `https://pokeapi.co/api/v2/pokemon?offset=${apiSet.value}&limit=${apiLimit.value}`
})
const { data, isFetching, isFinished } = useFetch(apiUrl, { refetch: true })
const pokes = computed(() => {
  return isFinished.value && JSON.parse(data.value).results
})
const all = computed(() => {
  return isFinished.value && JSON.parse(data.value)
})
const count = computed(() => {
  return isFinished.value && JSON.parse(data.value).count
})
const prevApiUrl = computed(() => {
  return isFinished.value && JSON.parse(data.value).previous
})
const nextApiUrl = computed(() => {
  return isFinished.value && JSON.parse(data.value).next
})
const page = computed(() => {
  return Math.floor(apiSet.value / apiLimit.value + 1)
})
const setLimit = (limit: number) => {
  apiLimit.value = limit
}
const setPage = (page: number) => {
  apiSet.value = (page - 1) * apiLimit.value
}
const nextPage = () => {
  setPage(page.value + 1)
}
const prevPage = () => {
  setPage(page.value - 1)
}
const lastPage = computed(() => {
  return Math.ceil(count.value / apiLimit.value)
})
const monHolder = computed(() => {
  return apiLimit.value / 3 * 30
})
</script>

<template>
  <main>
    <el-button-group>
      <el-button type="primary" :loading="isFetching" @click="setLimit(5)">5</el-button>
      <el-button type="primary" :loading="isFetching" @click="setLimit(10)">10</el-button>
      <el-button type="primary" :loading="isFetching" @click="setLimit(20)">20</el-button>
      <el-button type="primary" :loading="isFetching" @click="setLimit(25)">25</el-button>
      <el-button type="primary" :loading="isFetching" @click="setLimit(50)">50</el-button>
      <el-button type="primary" :loading="isFetching" @click="setLimit(count)">All</el-button>
    </el-button-group>
    <section class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <a v-for="{ name, url } in pokes" :key="url" :href="url" class="rounded px-4 py-2 bg-blue-100 font-bold text-gray-500">{{ name }}</a>
      <div v-if="isFetching || pokes.length <= 0" :style="`height: ${monHolder}px;`" class="col-span-full"></div>
    </section>
    <nav>
      <el-button-group>
        <el-button type="primary" :loading="isFetching" :disabled="prevApiUrl == null" @click="setPage(1)">
          First
        </el-button>
        <el-button type="primary" :loading="isFetching" :disabled="prevApiUrl == null" @click="prevPage()">
          Previous
        </el-button>
        <el-button :loading="isFetching" disabled >
          {{page}}
        </el-button>
        <el-button type="primary" :loading="isFetching" :disabled="nextApiUrl == null" @click="nextPage()">
          Next
        </el-button>
        <el-button type="primary" :loading="isFetching" :disabled="nextApiUrl == null" @click="setPage(lastPage)">
          Last
        </el-button>
      </el-button-group>
    </nav>
  </main>
</template>

<style scoped>
</style>
