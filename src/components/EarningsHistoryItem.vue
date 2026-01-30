<template>
  <div class="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100">
    <!-- Ícone + infos -->
    <div class="flex items-center gap-4">
      <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-3xl">📺</span>
      </div>
      
      <div>
        <p class="font-semibold text-gray-800 text-lg">Anúncio assistido</p>
        <p class="text-sm text-gray-500 mt-1">
          {{ formattedDate }}
        </p>
      </div>
    </div>

    <!-- Valor ganho -->
    <div class="text-right">
      <p class="text-2xl font-bold text-green-600">+50 Kz</p>
      <p class="text-xs text-gray-400 mt-1">Recompensa</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format, formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'

defineProps({
  date: {
    type: [String, Date],
    required: true
  },
  // Opcional: se quiseres mostrar mais detalhes no futuro
  videoId: String
})

const formattedDate = computed(() => {
  const d = new Date(props.date)
  
  // Mostra "há X minutos" se for hoje, senão data completa
  if (differenceInCalendarDays(new Date(), d) === 0) {
    return formatDistanceToNow(d, { addSuffix: true, locale: pt })
  }
  
  return format(d, "dd 'de' MMMM 'às' HH:mm", { locale: pt })
})
</script>