<template>
  <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-lg opacity-90">Próximo Saque Disponível</p>
        <p class="text-3xl font-bold mt-2">30 de {{ nextMonth }}</p>
        <p class="text-sm mt-1 opacity-80">Mínimo: 30.000 Kz</p>
      </div>
      <div class="text-6xl">💰</div>
    </div>
    <div v-if="balance >= 30000" class="mt-4 bg-white bg-opacity-20 rounded-xl p-4 text-center">
      <p class="font-bold">Você já pode sacar!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  balance: Number
})

const nextMonth = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  return date.toLocaleDateString('pt-AO', { month: 'long', year: 'numeric' })
})
</script>