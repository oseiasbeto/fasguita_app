<template>
  <div class="min-h-screen bg-gray-50 pb-24">
   <Navbar title="Histórico de Ganhos" />

    <div class="p-6 space-y-4">
      <p v-if="history.length === 0" class="text-center text-gray-500 py-10">
        Ainda não assistiu nenhum anúncio. Comece agora!
      </p>

      <EarningsHistoryItem 
        v-for="item in history" 
        :key="item.date"
        :date="item.date"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import EarningsHistoryItem from '@/components/EarningsHistoryItem.vue'
import Navbar from '@/components/Navbar.vue'

const store = useStore()
const history = ref([])

onMounted(async () => {
  if (!store.state.token) return

  try {
    await store('fetchHistory')
  } catch (err) {
    console.error('Erro ao carregar histórico', err)
  }
})
</script>