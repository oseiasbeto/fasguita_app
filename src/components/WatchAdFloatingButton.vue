<template>
  <button
    @click="handleWatch"
    :disabled="disabled || loading"
    :aria-label="disabled ? 'Limite diário atingido' : loading ? 'Carregando anúncio' : 'Assistir anúncio e ganhar 50 Kz'"
    class="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-80 sm:w-96 h-20 rounded-full shadow-2xl transform transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 overflow-hidden"
    :class="[
      disabled 
        ? 'bg-gray-400 cursor-not-allowed shadow-inner scale-95' 
        : loading 
          ? 'bg-gradient-to-r from-green-700 to-emerald-800 cursor-wait animate-pulse' 
          : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:brightness-110 hover:shadow-3xl animate-pulse-slow'
    ]"
  >
    <!-- Overlay de brilho animado -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

    <!-- Conteúdo central -->
    <div class="relative z-10 flex items-center justify-center h-full text-white px-8 gap-4">
      <!-- Loading -->
      <div v-if="loading" class="flex items-center gap-4">
        <svg class="animate-spin h-10 w-10 text-white drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-xl font-bold tracking-wide drop-shadow-md">
          Carregando...
        </span>
      </div>

      <!-- Desabilitado -->
      <div v-else-if="disabled" class="flex items-center gap-4 opacity-80">
        <div class="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center backdrop-blur-sm">
          <svg class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2m4 0c0 1.1-.9 2-2 2s-2-.9-2-2m6 0c0-1.1.9-2 2-2s2 .9 2 2m-4 0c0 1.1.9 2 2 2s2-.9 2-2m-6 5c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" />
          </svg>
        </div>
        <div class="text-left">
          <p class="text-2xl font-black drop-shadow-lg">Limite Atingido</p>
          <p class="text-base text-red-100">Volta amanhã!</p>
        </div>
      </div>

      <!-- Normal -->
      <div v-else class="flex items-center justify-between w-full">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner animate-pulse-slow">
            <svg class="w-10 h-10 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-5l4 2.5-4 2.5z"/>
            </svg>
          </div>
          <div>
            <p class="text-4xl font-black drop-shadow-2xl tracking-tight">+50 Kz</p>
            <p class="text-lg text-white/90 font-medium">Assistir Agora</p>
          </div>
        </div>

        <!-- Seta animada -->
        <svg class="w-10 h-10 text-white animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup>
const emit = defineEmits(['watch'])

const props = defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const handleWatch = () => {
  if (!props.disabled && !props.loading) {
    emit('watch')
  }
}
</script>

<style scoped>
/* Animação de pulso suave no botão ativo */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

/* Animação de bounce horizontal na seta */
.animate-bounce-x {
  animation: bounceX 2s infinite;
}

@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(8px); }
}

/* Shimmer effect no overlay */
.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>