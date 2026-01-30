<template>
  <div class="bg-white p-5 rounded-2xl shadow-md">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ title }}</h3>
    
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600">
        {{ watched }} / {{ limit }}
      </span>
      <span class="text-sm font-medium text-primary">
        {{ progress.toFixed(0) }}%
      </span>
    </div>
    
    <ion-progress-bar 
      :value="progress / 100" 
      class="h-3 rounded-full overflow-hidden"
      :color="progress >= 90 ? 'danger' : 'primary'"
    ></ion-progress-bar>
    
    <p v-if="remaining > 0" class="text-xs text-gray-500 mt-2 text-center">
      Faltam {{ remaining }} anúncios
    </p>
    <p v-else class="text-xs text-red-600 mt-2 text-center font-medium">
      Limite atingido! Volte amanhã/mês.
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  watched: { type: Number, required: true },
  limit: { type: Number, required: true },
  remaining: { type: Number, required: true }
})

const progress = computed(() => (props.watched / props.limit) * 100)
</script>