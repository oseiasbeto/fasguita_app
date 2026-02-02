<template>
  <div class="min-h-screen bg-gray-50 pb-24">
    <Navbar title="Solicitar Saque" />
    <div class="p-6 space-y-8">
      <WithdrawStatusCard :balance="store.state.balance" />

      <div class="bg-white rounded-2xl p-6 shadow-md">
        <p class="text-center text-lg mb-6">
          Saldo disponível para saque: 
          <span class="font-bold text-2xl text-green-600">{{ store.state?.balance?.toLocaleString('pt-AO') }} Kz</span>
        </p>

        <button 
          @click="requestWithdraw"
          :disabled="store.state?.balance < 30000 || store.state.loading || !isEndOfMonth"
          class="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ store.state.loading ? 'Processando...' : 'Solicitar Saque Agora' }}
        </button>

        <p v-if="!isEndOfMonth" class="text-center text-sm text-red-600 mt-4">
          Saques só podem ser solicitados no último dia do mês.
        </p>

        <p v-if="store.state.error" class="text-red-600 text-center mt-4">
          {{ store.state.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import WithdrawStatusCard from '@/components/WithdrawStatusCard.vue'
import Navbar from '@/components/Navbar.vue'

const store = useStore()

const isEndOfMonth = computed(() => {
  const now = new Date()
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  return now.getDate() === lastDay
})

onMounted(() => {
  store.dispatch('fetchUserData')
})

const requestWithdraw = async () => {
  if (confirm('Confirmar solicitação de saque de ' + store.state.balance + ' Kz?')) {
    try {
      await store.dispatch('requestWithdrawal', store.state.balance) // cria esta action no store se necessário
      alert('Solicitação enviada! Aguarde aprovação no final do mês.')
    } catch (err) {
      alert('Erro ao solicitar saque.')
    }
  }
}
</script>