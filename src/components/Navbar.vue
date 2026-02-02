<template>
  <nav class="sticky top-0 z-50 w-full px-5 py-4 h-20 flex items-center justify-between bg-white border-b border-gray-200/30">
    <!-- Botão Voltar (esquerda) -->
    <button 
      @click="goBack"
      class="p-3 -ml-3 rounded-full hover:bg-gray-100/50 active:bg-gray-200/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
      aria-label="Voltar"
    >
      <svg class="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Título centralizado -->
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight drop-shadow-sm">
      {{ title }}
    </h1>

    <!-- Espaço vazio à direita (para equilíbrio visual) -->
    <div class="w-14"></div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: 'Início'
  }
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
nav {
  transition: all 0.3s ease;
}

/* Leve sombra ao scrollar (opcional, mas bonito) */
nav.scrolled {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
}
</style>