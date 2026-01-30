<template>
  <div class="bg-orange-500 rounded-2xl p-6 text-white shadow-lg text-center">
    <div class="flex justify-center gap-2 mb-4">
      <span v-for="n in 7" :key="n" class="text-4xl">
        {{ streak >= n ? '🔥' : '⚪' }}
      </span>
    </div>
    <p class="text-4xl font-black">{{ streak }} dias</p>
    <p class="text-lg opacity-90">de streak!</p>
    <p class="text-sm mt-2">Volta amanhã para manter 🔥</p>
  </div>
</template>

<script setup>
defineProps({
  streak: { type: Number, default: 0 }
})
</script>