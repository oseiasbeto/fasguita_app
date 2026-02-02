<template>
  <div class="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
    <!-- Cabeçalho -->
    <div class="px-6 pt-5 pb-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800">
          {{ title }}
        </h3>
      </div>

      <div class="text-right">
        <span class="text-sm font-semibold" :class="progressColorClass">
          {{ progress.toFixed(0) }}%
        </span>
      </div>
    </div>

    <!-- Progresso -->
    <div class="px-6 pb-5">
      <div class="relative pt-1">
        <div class="overflow-hidden h-4 bg-gray-200 rounded-full shadow-inner">
          <div 
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="progressBarClass"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Informações -->
      <div class="mt-4 flex justify-between items-center text-sm">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-700">
            {{ watched }} / {{ limit }}
          </span>
          <span class="text-gray-500">anúncios assistidos</span>
        </div>

        <div v-if="remaining > 0" class="text-right">
          <span class="font-medium text-emerald-600">
            Faltam {{ remaining }}
          </span>
        </div>
        <div v-else class="text-right">
          <span class="font-medium text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Limite atingido
          </span>
        </div>
      </div>
    </div>

    <!-- Footer motivacional / status -->
    <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 text-center">
      <p class="text-xs" :class="statusTextClass">
        <span v-if="progress < 50">Estás a começar bem! Continua assim 💪</span>
        <span v-else-if="progress < 90">Quase lá! Mais um pouco 🔥</span>
        <span v-else-if="progress < 100">Parabéns! Limite quase completo 🎉</span>
        <span v-else>Volta amanhã para ganhar mais! 🌟</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  watched: { type: Number, required: true },
  limit: { type: Number, required: true },
  remaining: { type: Number, required: true }
})

const progress = computed(() => (props.watched / props.limit) * 100)

// Cores dinâmicas do progresso
const progressColorClass = computed(() => {
  if (progress.value >= 90) return 'text-red-600'
  if (progress.value >= 70) return 'text-amber-600'
  if (progress.value >= 40) return 'text-emerald-600'
  return 'text-green-600'
})

const progressBarClass = computed(() => {
  if (progress.value >= 90) return 'bg-gradient-to-r from-red-500 to-rose-600'
  if (progress.value >= 70) return 'bg-gradient-to-r from-amber-500 to-yellow-600'
  if (progress.value >= 40) return 'bg-gradient-to-r from-emerald-500 to-teal-600'
  return 'bg-gradient-to-r from-green-500 to-emerald-600'
})

const statusTextClass = computed(() => {
  if (progress.value >= 90) return 'text-red-600 font-medium'
  if (progress.value >= 70) return 'text-amber-700'
  return 'text-gray-600'
})
</script>