<template>
  <div class="bg-gradient-to-br from-purple-700 via-purple-600 to-violet-600 rounded-3xl p-6 text-white shadow-2xl border border-purple-500/30 transform transition-all duration-300 hover:shadow-3xl animate-fade-in-up">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <p class="text-lg font-medium opacity-90">
          Próximo Saque Disponível
        </p>
        <p class="text-3xl font-black tracking-tight">
          {{ nextPayoutDate }}
        </p>
        <p class="text-base opacity-85 pt-1.5">
          Mínimo para saque: <span class="font-bold">30.000 Kz</span>
        </p>
      </div>

      <div class="relative">
        <div class="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner">
          <svg class="w-12 h-12 text-purple-200 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  balance: {
    type: Number,
    default: 0
  }
})

// Próxima data de saque (último dia do próximo mês)
const nextPayoutDate = computed(() => {
  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0) // último dia válido
  return nextMonth.toLocaleDateString('pt-AO', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
})

// Formata moeda em Kz
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0
  }).format(value)
}
</script>

<style scoped>
/* Fade in suave ao montar */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulso leve no estado "pode sacar" */
.animate-pulse-slow {
  animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
</style>