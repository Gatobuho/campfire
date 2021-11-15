<script setup lang="ts">
import Footer1 from '~/components/MonFooter.vue'
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
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
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo text-teal-600 border-none"
          mode="horizontal"
          background-color="transparent"
          text-color="#fff"
          active-text-color="red"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="1">
            <router-link to="/read" class="px-2 hover:text-red-600">
              read
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/write" class="px-2 hover:text-red-600">
              write
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/pokemon" class="px-2 hover:text-red-600">
              Pokemon
            </router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/trainer" class="px-2 hover:text-red-600">
              Trainer
            </router-link>
          </el-menu-item>
          <el-sub-menu index="5">
            <template #title>
              Admin
            </template>
            <el-menu-item index="5-1">
              <router-link to="/admin" class="px-2 hover:text-red-600">
                Admin
              </router-link>
            </el-menu-item>
            <el-menu-item index="5-2" class="bg-gray-600">
              <router-link to="/admin/new_player" class="px-2 hover:text-red-600">
                A - New Player
              </router-link>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </nav>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <mon-footer />
    </el-footer>
  </el-container>
</template>
