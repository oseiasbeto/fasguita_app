<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
        <!-- Navbar fixo com título -->
        <Navbar title="Notificações" />

        <!-- Conteúdo principal -->
        <main class="p-6 space-y-6 pt-6">
            <!-- Loading skeleton -->
            <div v-if="loading" class="space-y-4">
                <div v-for="n in 5" :key="n" class="bg-white rounded-3xl p-5 shadow-md animate-pulse">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                        <div class="flex-1 space-y-3">
                            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                            <div class="h-4 bg-gray-200 rounded w-full"></div>
                            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lista de notificações -->
            <div v-else-if="notifications.length > 0" class="space-y-4">
                <div v-for="notif in notifications" :key="notif.id"
                    class="bg-white rounded-3xl p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-fade-in-up">
                    <div class="flex items-start gap-5">
                        <!-- Ícone à esquerda (diferente por tipo) -->
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md flex-shrink-0"
                            :class="getIconBg(notif.type)">
                            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path v-if="notif.type === 'withdrawal'" stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08 .402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path v-else-if="notif.type === 'bonus'" stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path v-else-if="notif.type === 'warning'" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <!-- Conteúdo da notificação -->
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-900 mb-1">
                                {{ notif.title }}
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                {{ notif.message }}
                            </p>
                            <p class="text-sm text-gray-500 mt-3">
                                {{ formatRelativeTime(notif.date) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Estado vazio -->
            <div v-else class="text-center py-20">
                <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v3m-4-5v5m-4-5v5" />
                    </svg>
                </div>
                <p class="text-xl font-semibold text-gray-700 mb-2">
                    Nenhuma notificação ainda
                </p>
                <p class="text-gray-500">
                    Fica atento! Aqui aparecerão novidades, saques aprovados e bónus.
                </p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Navbar from '@/components/Navbar.vue'

const store = useStore()
const notifications = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        // Assumindo que tens uma action no store para buscar notificações
        const response = await store.dispatch('fetchNotifications')
        notifications.value = response || []

        /*
        [
      { id: 1, type: "withdrawal", title: "Saque aprovado", message: "Seu saque de 45.000 Kz foi processado!", date: "2026-02-01T10:30:00Z" },
      { id: 2, type: "bonus", title: "Bónus recebido", message: "+500 Kz por streak de 7 dias!", date: "2026-01-30T18:15:00Z" }
    ]
        */
    } catch (err) {
        console.error('Erro ao carregar notificações:', err)
    } finally {
        loading.value = false
    }
})

// Formata tempo relativo (ex: "há 2 horas")
const formatRelativeTime = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now - date
    const diffMin = Math.floor(diffMs / 60000)

    if (diffMin < 1) return 'Agora mesmo'
    if (diffMin < 60) return `há ${diffMin} min`
    if (diffMin < 1440) return `há ${Math.floor(diffMin / 60)} h`
    return date.toLocaleDateString('pt-AO', { day: 'numeric', month: 'short' })
}

// Cor de fundo do ícone por tipo de notificação
const getIconBg = (type) => {
    const colors = {
        withdrawal: 'bg-emerald-600',
        bonus: 'bg-amber-500',
        warning: 'bg-red-500',
        info: 'bg-blue-500'
    }
    return colors[type] || 'bg-gray-500'
}
</script>

<style scoped>
/* Animação suave de entrada para cada item */
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Delay sequencial nos itens da lista */
main>div>div:nth-child(1) {
    animation-delay: 0.1s;
}

main>div>div:nth-child(2) {
    animation-delay: 0.2s;
}

main>div>div:nth-child(3) {
    animation-delay: 0.3s;
}

/* ... continua para mais itens se necessário */
</style>