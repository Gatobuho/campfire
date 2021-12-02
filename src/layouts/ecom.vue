<script setup lang='ts'>
// const { t } = useI18n()
const openedMenu = ref(true)
const toggleMenu = useToggle(openedMenu)
</script>

<template>
  <router-view />
  <nav class="fixed bottom-3 right-3 rounded p-4 bg-gray-300 shadow flex">
    <ul v-show="openedMenu" class="flex font-bold">
      <li class="px-2">
        <router-link to="/ecommerce/">
          Home
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/index2">
          Home 2
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/index3">
          Home 3
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/product1">
          Product
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/product2">
          Product 2
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/orderHistory">
          Orders
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/orderDetail">
          Order
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/cart">
          Cart
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/checkout">
          Checkout
        </router-link>
      </li>
      <li class="px-2">
        <router-link to="/ecommerce/categories">
          Category Page
        </router-link>
      </li>
      <li class="px-2 bg-gray-200">
        <router-link to="/ecommerce/admin">
          Admin
        </router-link>
      </li>
      <li class="px-2 bg-gray-200">
        <router-link to="/ecommerce/admin/detail">
          Detalle
        </router-link>
      </li>
      <li class="px-2 bg-gray-200">
        <router-link to="/ecommerce/admin/settings">
          Config
        </router-link>
      </li>
    </ul>
    <button @click.prevent="toggleMenu()">
      <i :class="openedMenu ? 'i-mdi:close-thick' : 'i-mdi:menu'"></i>
    </button>
  </nav>
</template>
