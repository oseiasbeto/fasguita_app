<!-- src/views/ResetPasswordView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <h1 class="text-5xl font-black text-green-700">Fasguita</h1>
        <p class="text-gray-600 mt-2">Redefinir senha</p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-center mb-8">Nova senha</h2>

        <form @submit.prevent="handleReset" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nova senha</label>
            <input
              v-model="newPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          <button
            type="submit"
            :disabled="loading || newPassword !== confirmPassword || newPassword.length < 6"
            class="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition disabled:opacity-60"
          >
            {{ loading ? 'Redefinindo...' : 'Redefinir senha' }}
          </button>

          <p v-if="error" class="text-red-600 text-center mt-4">{{ error }}</p>
          <p v-if="success" class="text-green-600 text-center mt-4">{{ success }}</p>
        </form>

        <div class="mt-6 text-center">
          <router-link to="/login" class="text-green-600 hover:underline">
            Voltar para login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const resetToken = localStorage.getItem('resetToken')
const resetPhone = localStorage.getItem('resetPhone')

onMounted(() => {
  if (!resetToken || !resetPhone) {
    router.push('/forgot-password')
  }
})

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await api.post('/auth/reset-password', {
      phone: resetPhone,
      resetToken,
      newPassword: newPassword.value
    })

    success.value = 'Senha redefinida! Pode entrar agora.'
    localStorage.removeItem('resetToken')
    localStorage.removeItem('resetPhone')

    setTimeout(() => router.push('/login'), 3000)
  } catch (err) {
    error.value = err.response?.data?.msg || 'Erro ao redefinir senha'
  } finally {
    loading.value = false
  }
}
</script>