<template>
  <div class="min-h-screen bg-gray-50 pb-24">
    <header class="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
      <h1 class="text-3xl font-black text-center">Fasguita</h1>
      <p class="text-center mt-1 opacity-90">Ganhe renda extra assistindo anúncios</p>
    </header>

    <div class="p-6 space-y-8">

      <BalanceDisplay :balance="store.state.balance" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <LimitProgress 
          title="Hoje" 
          :watched="store.state.daily.watched" 
          :limit="store.state.daily.limit" 
          :remaining="store.state.daily.remaining" 
        />
        <LimitProgress 
          title="Este Mês" 
          :watched="store.state.monthly.watched" 
          :limit="store.state.monthly.limit" 
          :remaining="store.state.monthly.remaining" 
        />
      </div>

      <!-- Podes calcular o streak no store e passar como prop -->
      <DailyStreak :streak="store.getters.dailyStreak" /> <!-- Podes calcular no store depois -->

      <!-- Informações de saque -->
      <WithdrawStatusCard :balance="store.state.balance" />

      <!-- Botão para assistir anúncio -->
      <WatchAdButton 
        :loading="store.state.loading" 
        :disabled="!store.getters.canWatchAd"
        @watch="handleWatchAd"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import BalanceDisplay from '@/components/BalanceDisplay.vue' // ajusta props conforme teu componente
import WatchAdButton from '@/components/WatchAdButton.vue' // ajusta props conforme teu componente
import LimitProgress from '@/components/LimitProgress.vue' // ajusta props conforme teu componente
import DailyStreak from '@/components/DailyStreak.vue' // ajusta props conforme teu componente
import WithdrawStatusCard from '@/components/WithdrawStatusCard.vue' // ajusta props conforme teu componente

const store = useStore()
const router = useRouter()

onMounted(() => {
  if (!store.state.token) {
    router.push('/login')
    return
  }
  store.dispatch('fetchUserData')
})

const handleWatchAd = async () => {
  try {
    await store.dispatch('watchAd')
    alert('Anúncio concluído! +50 Kz adicionados.')
  } catch (err) {
    alert('Erro ao assistir anúncio. Tente novamente.')
  }
}
</script>