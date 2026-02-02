<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
    <!-- Navbar fixo -->
    <Navbar title="Eu" />
    
    <!-- Conteúdo principal -->
    <main class="p-6 space-y-8 pt-8">
      <!-- Card de perfil -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 transform transition-all duration-300  text-center">
        <!-- Foto + Nome -->
        <div class="mb-6">
          <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-500 s bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <img 
              v-if="userAvatar" 
              :src="userAvatar" 
              alt="Perfil" 
              class="w-full h-full object-cover"
            />
            <svg v-else class="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mt-4">
            {{ userName || 'Usuário' }}
          </h2>
          <p class="text-lg text-gray-600 mt-1">
            +244 {{ userPhone || 'Sem telefone' }}
          </p>
        </div>

        <!-- Saldo destacado -->
        <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white">
          <p class="text-xl opacity-90 mb-2">Saldo disponível</p>
          <p class="text-5xl font-black tracking-tight">
            {{ formatCurrency(userBalance) }}
          </p>
        </div>
      </div>

      <!-- Menu de opções -->
      <div class="space-y-4">
        <div 
          v-for="option in menuOptions" 
          :key="option.title"
          @click="option.action"
          class="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center gap-5 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 cursor-pointer"
        >
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md" :class="option.color">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path v-if="option.icon === 'wallet'" stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else-if="option.icon === 'history'" stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else-if="option.icon === 'support'" stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>

          <div class="flex-1">
            <p class="text-lg font-semibold text-gray-900">
              {{ option.title }}
            </p>
            <p class="text-sm text-gray-600">
              {{ option.subtitle }}
            </p>
          </div>

          <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Botão Sair (vermelho suave) -->
      <button
        @click="logout"
        class="w-full py-6 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl font-bold text-2xl hover:shadow-3xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
      >
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair da conta
      </button>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const store = useStore()
const router = useRouter()

const userName = computed(() => store.getters.currentUser?.fullName || 'Usuário')
const userPhone = computed(() => store.getters.currentUser?.phone || '')
const userAvatar = computed(() => store.getters.currentUser?.avatar || '')
const userBalance = computed(() => store.getters.userBalance || 0)

const menuOptions = [
  {
    title: 'Solicitar saque',
    subtitle: 'Solicitar saque ver e histórico',
    icon: 'wallet',
    color: 'bg-emerald-600',
    action: () => router.push('/withdraw')
  },
  {
    title: 'Histórico de Ganhos',
    subtitle: 'Todos os anúncios assistidos',
    icon: 'history',
    color: 'bg-amber-500',
    action: () => router.push('/history')
  },
  {
    title: 'Suporte',
    subtitle: 'Fale connosco ou envie reclamação',
    icon: 'support',
    color: 'bg-blue-500',
    action: () => router.push('/support')
  }
]

const logout = async () => {
  if (confirm('Tem certeza que deseja sair da conta?')) {
    await store.dispatch('logout')
    router.push('/login')
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(value)
}
</script>

<style scoped>
/* Animação suave de entrada para cards e itens */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Delay sequencial nos itens do menu */
.space-y-4 > div:nth-child(1) { animation-delay: 0.1s; }
.space-y-4 > div:nth-child(2) { animation-delay: 0.2s; }
.space-y-4 > div:nth-child(3) { animation-delay: 0.3s; }
</style>