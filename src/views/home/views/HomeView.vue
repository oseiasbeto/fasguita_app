<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
    <!-- Header fixo + sticky -->
    <header class="sticky top-0 z-50 bg-emerald-700 text-white shadow-lg">
      <div class="px-6 py-4 flex items-center justify-between">
        <!-- Avatar + Nome -->
        <div class="flex items-center gap-3" @click="goToProfile">
          <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden border-2 border-white/40 shadow-md">
            <img 
              v-if="userAvatar" 
              :src="userAvatar" 
              alt="Perfil" 
              class="w-full h-full object-cover"
            />
            <svg v-else class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-lg">{{ userName || 'Bem-vindo' }}</p>
            <p class="text-sm opacity-90">ID: {{ userId || 'Novo' }}</p>
          </div>
        </div>

        <!-- Ícones direito -->
        <div class="flex items-center gap-5">
          <button class="relative" @click="openNotifications">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadNotifications > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] flex items-center justify-center">
              {{ unreadNotifications }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="p-6 space-y-8 pt-4">
      <!-- Saldo principal -->
      <BalanceDisplay 
        :balance="store.state?.balance || 0" 
        :pending="store.state?.pendingBalance || 0"
      />

      <!-- Progressos (hoje e mês) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <LimitProgress 
          title="Hoje" 
          :watched="dailyStatus?.watched || 0" 
          :limit="dailyStatus?.limit || 10" 
          :remaining="dailyStatus?.remaining || 0" 
        />
        <LimitProgress 
          title="Este Mês" 
          :watched="monthlyStatus?.watched || 0" 
          :limit="monthlyStatus?.limit || 100" 
          :remaining="monthlyStatus?.remaining || 0" 
        />
      </div>

      <!-- Cartão de saque -->
      <WithdrawStatusCard :balance="store.state?.balance || 0" />

      <!-- Espaço para botão flutuante -->
      <div class="h-8"></div>
    </main>

    <!-- Botão flutuante de assistir anúncio -->
    <WatchAdFloatingButton 
      :loading="store.state.loadingAd" 
      :disabled="!dailyStatus?.canWatchMore"
      @watch="handleWatchAd"
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import BalanceDisplay from '@/components/BalanceDisplay.vue'
import LimitProgress from '@/components/LimitProgress.vue'
import WithdrawStatusCard from '@/components/WithdrawStatusCard.vue'
import WatchAdFloatingButton from '@/components/WatchAdFloatingButton.vue' // versão flutuante que melhoramos antes

const store = useStore()
const router = useRouter()

const userName = computed(() => store.getters.currentUser?.fullName || 'Usuário')
const userAvatar = computed(() => store.getters.currentUser?.avatar || '')
const userId = computed(() => store.getters.currentUser?._id?.slice(-8) || '')
const unreadNotifications = computed(() => store.state.notifications?.unread || 0)
const dailyStatus = computed(() => store.getters.dailyStatus)
const monthlyStatus = computed(() => store.getters.monthlyStatus)

onMounted(() => {
  store.dispatch('fetchDailyStatus')
  store.dispatch('fetchMonthlyStatus')
})


const openNotifications = () => {
  router.push('/notifications')
}

const openMenu = () => {
  router.push('/profile')
}

const handleWatchAd = async () => {
  try {
    await store.dispatch('watchAd')
    // Sucesso: atualiza saldo e mostra toast
  } catch (err) {
    // Erro: mostra toast
  }
}
</script>

<style scoped>
/* Animação suave de entrada para o header e cards */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Sombra extra no hover do header */
header:hover {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
}
</style>