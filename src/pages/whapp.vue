<script setup lang='ts'>
const { t } = useI18n()
const text = ref('')
const phone = ref('')
const link = computed(() => {
  const textEncode = encodeURI(text.value)
  return `https://wa.me/${phone.value}?text=${textEncode}`
})
const dirty = computed(() => text.value.length > 0 && phone.value.length > 0)
const { text: result, copy, copied, isSupported } = useClipboard({ source: link })
</script>

<template>
  <main class="space-y-2 max-w-sm bg-gray-800 p-4 rounded mx-auto">
    <p v-if="isSupported">
      No me podes usar
    </p>
    <span class="i-ant-design:smile-filled w-20 h-20 text-green-600 hover:i-ant-design:smile-twotone hover:text-red-600 hover:w-20 hover:h-20"></span>
    <el-input v-model="phone" placeholder="tu telefono" clearable />
    <el-input v-model="text" placeholder="El texto" clearable />
    <div class="flex justify-end">
      <el-button v-if="!copied" type="success" round @click="copy">
        Copiar
      </el-button>
      <el-button v-else type="success" round disabled>
        Copiado
      </el-button>
    </div>
    <p v-if="dirty">
      {{ link }}
    </p>
    {{ result }}
  </main>
</template>

<style scoped>
    .max-w-sm {
      max-width: 300px;
    }
</style>

<route lang='yaml'>
meta:
  layout:
</route>
