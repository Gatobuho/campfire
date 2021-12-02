<script setup lang="ts">
</script>
<template>
  <el-container class="h-full text-gray-700 dark:text-gray-200 dark:bg-gray-900">
    <el-header class="bg-gray-300 dark:bg-gray-700">
      <nav class="flex items-center justify-between flex-wrap max-w-300 mx-auto">
        <router-link to="/" class="flex items-center flex-shrink-0 text-white mr-6 px-6 py-2">
          <img class="w-8 h-8 m-2" src="/iconx2.png" alt="a stialized generic mon icon">
          <h1 class="font-semibold text-xl tracking-tight">
            <strong>NFC</strong>
            <span>mon</span>
          </h1>
        </router-link>
      </nav>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
