<template>
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-600 p-8 shadow-2xl">
    <div class="absolute inset-0 bg-black opacity-20"></div>
    <div class="relative z-10 text-white">
      <p class="text-lg opacity-90">Saldo Atual</p>
      <p class="text-5xl font-black mt-2 tracking-tight">{{ balance.toLocaleString() }} <span class="text-3xl">Kz</span></p>
      <p class="text-sm mt-3 opacity-80">Ganha mais assistindo anúncios ↓</p>
    </div>
    <div class="absolute -bottom-10 -right-10 text-yellow-300 opacity-30">
      <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  balance: { type: Number, default: 0 }
})
</script>