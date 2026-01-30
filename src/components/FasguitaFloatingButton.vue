<template>
  <button 
    @click="$emit('click')"
    class="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white text-4xl transform transition-all hover:scale-110 z-50 animate-pulse"
  >
    <span>▶️</span>
  </button>
</template>