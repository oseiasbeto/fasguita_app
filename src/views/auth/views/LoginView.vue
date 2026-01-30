<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Espaço superior (feel de status bar) -->
    <div class="h-16"></div>

    <!-- Conteúdo central -->
    <div class="flex-1 flex flex-col justify-center px-6 pb-12">
      <div class="w-full">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">
          Entrar
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-8" autocomplete="off">
          <!-- Telefone -->
          <div>
            <label class="block text-base font-medium text-gray-700 mb-3">
              Número de telefone
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <span class="text-gray-600 font-semibold text-lg">+244</span>
              </div>

              <input ref="phoneInput" v-model="displayPhone" type="tel" inputmode="numeric" pattern="[0-9\s]*"
                placeholder="912 345 678" maxlength="12" autocomplete="off" name="phone-hidden"
                :readonly="isPhoneReadonly" required
                class="w-full pl-24 pr-14 py-5 text-xl border-2 rounded-2xl focus:outline-none transition-all duration-200"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100': phoneError && phoneTouched,
                  'border-green-500 focus:border-green-500 focus:ring-green-100': phoneValid && phoneTouched && !phoneError,
                  'border-gray-300 focus:border-green-500 focus:ring-green-100': !phoneTouched || (!phoneError && !phoneValid)
                }" @focus="isPhoneReadonly = false; $nextTick(() => $refs.phoneInput.focus())"
                @blur="phoneTouched = true; validatePhone()" />

              <!-- Ícone de feedback -->
              <div class="absolute inset-y-0 right-5 flex items-center">
                <svg v-if="phoneValid && phoneTouched && !phoneError" class="w-7 h-7 text-green-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-if="phoneError && phoneTouched" class="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <p v-if="phoneError && phoneTouched" class="mt-2 text-sm text-red-600 font-medium">
              {{ phoneError }}
            </p>
          </div>

          <!-- Senha -->
          <div>
            <label class="block text-base font-medium text-gray-700 mb-3">
              Senha
            </label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                autocomplete="new-password" name="password-hidden"
                class="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all pr-16"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100': password.length > 0 && password.length < 6,
                  'border-green-500 focus:border-green-500 focus:ring-green-100': password.length >= 6
                }" />

              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-5 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg v-if="showPassword" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            <p v-if="password.length > 0 && password.length < 6" class="mt-2 text-sm text-red-600 font-medium">
              A senha precisa ter pelo menos 6 caracteres
            </p>
          </div>

          <!-- Botão -->
          <button type="submit" :disabled="loading || !isFormValid"
            class="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
            <svg v-if="loading" class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'A entrar...' : 'Entrar' }}
          </button>

          <div v-if="error"
            class="fixed bottom-6 left-6 right-6 mx-auto max-w-md bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-fade-in-up">
            <span class="font-medium">{{ error }}</span>
            <button @click="error = ''" class="text-white hover:text-gray-200 focus:outline-none">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!-- Links inferiores -->
      <div class="mt-10 text-center space-y-4">
        <router-link to="/register" class="text-green-700 font-semibold text-lg hover:underline block">
          Criar conta nova
        </router-link>
        <router-link to="/forgot-password" class="text-gray-600 hover:text-gray-800 text-base">
          Esqueci a senha
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const phone = ref('')                // Valor limpo: só números (enviado ao backend)
const displayPhone = ref('')         // Valor exibido: com máscara visual
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const phoneError = ref('')
const phoneValid = ref(false)
const phoneTouched = ref(false)

// Anti-autofill para telefone
const isPhoneReadonly = ref(true)

// Máscara visual (912 345 678) — não interfere na validação
watch(displayPhone, (newVal) => {
  // Remove tudo que não é número
  let digits = newVal.replace(/\D/g, '')

  // Limita a 9 dígitos
  digits = digits.slice(0, 9)

  // Aplica máscara apenas no display
  let masked = digits
  if (digits.length >= 4) masked = digits.slice(0, 3) + ' ' + digits.slice(3)
  if (digits.length >= 7) masked = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6)

  // Atualiza display sem causar loop
  if (masked !== newVal) {
    nextTick(() => {
      displayPhone.value = masked
      phone.value = digits  // phone sempre limpo!
      validatePhone()       // valida o valor limpo
    })
  } else {
    phone.value = digits
    validatePhone()
  }
})

const resetForm = () => {
  phone.value = ''
  displayPhone.value = ''
  password.value = ''
  showPassword.value = false
  loading.value = false
  error.value = ''
  phoneError.value = ''
  phoneValid.value = false
  phoneTouched.value = false
}

// Validação 100% baseada em phone.value (limpo, sem espaços)
const validatePhone = () => {
  const digits = phone.value.trim()  // sempre sem espaços

  phoneError.value = ''

  if (!digits) {
    phoneError.value = 'O número é obrigatório'
    phoneValid.value = false
  } else if (digits.length !== 9) {
    phoneError.value = 'Deve ter exatamente 9 dígitos'
    phoneValid.value = false
  } else if (!digits.startsWith('9')) {
    phoneError.value = 'Deve começar com 9'
    phoneValid.value = false
  } else {
    phoneValid.value = true
    phoneError.value = ''
  }
}

// Form válido
const isFormValid = computed(() => {
  return phoneValid.value && password.value.length >= 6 && !loading.value
})

const handleLogin = async () => {
  phoneTouched.value = true
  validatePhone()

  if (!isFormValid.value) return

  loading.value = true
  error.value = ''

  const success = await store.dispatch('login', {
    phone: phone.value,  // valor limpo, sem espaços!
    password: password.value
  })

  loading.value = false

  if (success) {
    router.push('/home')
  } else {
    error.value = store.state.error || 'Número ou senha incorretos'
    // Auto-sumir erro geral após 5 segundos
    setTimeout(() => {
      error.value = ''
    }, 5000)
  }
}
</script>

<style scoped>
/* Auto-sumir animação suave */
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
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