<!-- src/components/Footer.vue -->
<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div class="max-w-md mx-auto flex justify-around items-center h-16">
      <router-link to="/home" class="flex flex-col items-center p-2 transition-colors"
        :class="{ 'text-green-600': isActive('/home'), 'text-gray-600 hover:text-green-500': !isActive('/home') }">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1 font-medium">Início</span>
      </router-link>

      <router-link to="/history" class="flex flex-col items-center p-2 transition-colors"
        :class="{ 'text-green-600': isActive('/history'), 'text-gray-600 hover:text-green-500': !isActive('/history') }">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs mt-1 font-medium">Histórico</span>
      </router-link>

      <router-link to="/withdraw" class="flex flex-col items-center p-2 transition-colors"
        :class="{ 'text-green-600': isActive('/withdraw'), 'text-gray-600 hover:text-green-500': !isActive('/withdraw') }">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 9V7a5 5 0 10-10 0v2m-3 5a5 5 0 0110 0v1a2 2 0 002 2h1a2 2 0 002-2v-1a5 5 0 00-5-5z" />
        </svg>
        <span class="text-xs mt-1 font-medium">Saque</span>
      </router-link>

      <router-link to="/profile"
        class="flex flex-col items-center p-2 text-gray-600 transition-colors"
        :class="{ 'text-green-600': isActive('/profile'), 'text-gray-600 hover:text-green-500': !isActive('/profile') }">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="text-xs mt-1 font-medium">Eu</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const isActive = (path) => route.path === path || route.path.startsWith(path + '/')

const logout = () => {
  store.dispatch('logout')
  router.push('/login')
}
</script>