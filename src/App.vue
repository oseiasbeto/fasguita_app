<script setup>
import SplashScreen from "./components/SplashScreen.vue"
import Footer from "./components/Footer.vue"
import { useStore } from "vuex"
import { computed, onMounted, ref, onUnmounted } from "vue";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";

// Estado de loading do app
const loading = ref(true)

// Vuex store
const store = useStore()

const route = useRoute()

// Pega sessão salva em cookie
const sessionId = Cookies.get("session_id")

// Pega dados do usuário
const user = computed(() => {
  return store.getters.currentUser
})

// Pega token de acesso
const accessToken = computed(() => {
  return store.getters.accessToken
})

// Verifica se está autenticado
const isAuthenticated = computed(() => {
  if (accessToken.value) return true
  else return false
})

const handleRefreshToken = async () => {
  try {
    await store.dispatch("refreshToken", sessionId)
    loading.value = false
  } catch (err) {
    console.error("Erro ao restaurar sessão:", err)
    loading.value = false
  }
}

onMounted(async () => {
  // Se tiver sessão salva, tentar restaurar
  if (sessionId && !isAuthenticated.value) {
    await handleRefreshToken()
  } else {
    loading.value = false
  }
})

onUnmounted(() => {
});
</script>

<template>

  <div
    :class="['font-primary bg-background-primary text-text-primary relative w-screen text-sm h-screen text-light-text-primary overflow-auto']">
    <!-- start main app area-->
    <div v-if="!loading">
      <!--start content-->
      <div class="h-full">
        <router-view v-slot="{ Component }">
          <keep-alive :include="['NotificationsView', 'WithdrawView']">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>

      <!--start sidebar-->
      <Footer v-if="isAuthenticated && route.meta.rootPage === 'home'"/>
    </div>
    <div v-else>
      <splash-screen />
    </div>
    <!-- end main app area-->
  </div>

</template>
