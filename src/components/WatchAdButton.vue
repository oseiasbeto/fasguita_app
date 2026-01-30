<template>
  <button 
    @click="handleWatch" 
    :disabled="disabled || loading"
    class="relative w-full h-32 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 active:scale-95"
    :class="disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-3xl'"
  >
    <div class="absolute inset-0 bg-black opacity-20"></div>
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
      <div v-if="loading" class="flex items-center gap-4">
        <ion-spinner name="crescent" class="text-4xl"></ion-spinner>
        <span class="text-2xl font-bold">Carregando anúncio...</span>
      </div>
      <div v-else-if="disabled" class="text-center">
        <p class="text-3xl font-black">Limite Atingido</p>
        <p class="text-lg mt-2">Volta amanhã!</p>
      </div>
      <div v-else class="text-center">
        <p class="text-5xl font-black">+50 Kz</p>
        <p class="text-xl mt-1">Assistir Anúncio Agora</p>
      </div>
    </div>
  </button>
</template>

<script setup>
const emit = defineEmits(['watch'])
const props = defineProps({
  loading: Boolean,
  disabled: Boolean
})

const handleWatch = () => {
  if (!props.disabled && !props.loading) emit('watch')
}
</script>