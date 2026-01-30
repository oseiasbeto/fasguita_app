<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Espaço superior (feel de status bar) -->
    <div class="h-16"></div>

    <!-- Conteúdo central -->
    <div class="flex-1 flex flex-col justify-center px-6 pb-12">
      <div class="w-full">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">
          Redefinir senha
        </h2>

        <form @submit.prevent="handleResetPassword" class="space-y-8" autocomplete="off">
          <!-- Telefone (somente leitura, vindo da query) -->
          <div>
            <label class="block text-base font-medium text-gray-700 mb-3">
              Número de telefone
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <span class="text-gray-600 font-semibold text-lg">+244</span>
              </div>

              <input
                v-model="phone"
                type="tel"
                readonly
                class="w-full pl-24 pr-14 py-5 text-xl border-2 border-gray-200 bg-gray-50 rounded-2xl focus:outline-none cursor-not-allowed text-gray-600"
              />
            </div>
          </div>

          <!-- Nova Senha -->
          <div>
            <label class="block text-base font-medium text-gray-700 mb-3">
              Nova senha
            </label>
            <div class="relative">
              <input
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                minlength="6"
                autocomplete="new-password"
                class="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all pr-16"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100': newPassword.length > 0 && newPassword.length < 6,
                  'border-green-500 focus:border-green-500 focus:ring-green-100': newPassword.length >= 6
                }"
              />

              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-5 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showNewPassword" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            <p v-if="newPassword.length > 0 && newPassword.length < 6" class="mt-2 text-sm text-red-600 font-medium">
              A senha precisa ter pelo menos 6 caracteres
            </p>
          </div>

          <!-- Confirmar Nova Senha -->
          <div>
            <label class="block text-base font-medium text-gray-700 mb-3">
              Confirmar nova senha
            </label>
            <div class="relative">
              <input
                v-model="confirmNewPassword"
                :type="showConfirmNewPassword ? 'text' : 'password'"
                required
                class="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all pr-16"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100': confirmNewPassword.length > 0 && confirmNewPassword !== newPassword,
                  'border-green-500 focus:border-green-500 focus:ring-green-100': confirmNewPassword.length > 0 && confirmNewPassword === newPassword
                }"
              />

              <button
                type="button"
                @click="showConfirmNewPassword = !showConfirmNewPassword"
                class="absolute inset-y-0 right-5 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg v-if="showConfirmNewPassword" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            <p v-if="confirmNewPassword.length > 0 && confirmNewPassword !== newPassword" class="mt-2 text-sm text-red-600 font-medium">
              As senhas não coincidem
            </p>
          </div>

          <!-- Botão Redefinir senha -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg v-if="loading" class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Redefinindo...' : 'Redefinir senha' }}
          </button>

          <!-- Erro geral (toast com auto-sumir e X) -->
          <div v-if="error" class="fixed bottom-6 left-6 right-6 mx-auto max-w-md bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-fade-in-up">
            <span class="font-medium">{{ error }}</span>
            <button @click="error = ''" class="text-white hover:text-gray-200 focus:outline-none">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- Link voltar para login -->
      <div class="mt-10 text-center">
        <router-link to="/login" class="text-green-700 font-semibold text-lg hover:underline">
          Voltar para entrar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const phone = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)
const loading = ref(false)
const error = ref('')

// Carrega o telefone da query param
onMounted(() => {
  const queryPhone = route.query.phone
  if (queryPhone) {
    phone.value = queryPhone
  } else {
    // Se não tiver phone na query, redireciona para forgot password
    router.push('/forgot-password')
  }

  // Verifica se tem resetToken no localStorage
  const resetToken = localStorage.getItem('resetToken')
  if (!resetToken) {
    error.value = 'Sessão expirada. Solicite um novo código.'
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  }
})

// Validação do form
const isFormValid = computed(() => {
  return (
    newPassword.value.length >= 6 &&
    confirmNewPassword.value === newPassword.value &&
    !loading.value
  )
})

// Função de reset password
const handleResetPassword = async () => {
  if (!isFormValid.value) {
    if (confirmNewPassword.value !== newPassword.value) {
      error.value = 'As senhas não coincidem'
      setTimeout(() => error.value = '', 5000)
    }
    return
  }

  loading.value = true
  error.value = ''

  // Simula loading de request
  await new Promise(resolve => setTimeout(resolve, 2000))

  try {
    const resetToken = localStorage.getItem('resetToken')
    const success = await store.dispatch('resetPassword', {
      phone: phone.value,
      newPassword: newPassword.value,
      resetToken
    })

    if (success) {
      // Limpa dados sensíveis
      localStorage.removeItem('resetToken')
      localStorage.removeItem('resetPhone')

      router.push('/login')
      // Opcional: mostrar toast de sucesso em login
    } else {
      error.value = store.state.error || 'Erro ao redefinir senha'
      setTimeout(() => error.value = '', 5000)
    }
  } catch (err) {
    error.value = err.message || 'Erro ao redefinir senha'
    setTimeout(() => error.value = '', 5000)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animação do toast */
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hack autofill */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: #000 !important;
  background-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>