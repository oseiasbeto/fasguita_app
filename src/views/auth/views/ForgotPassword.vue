<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Espaço superior (feel de status bar) -->
    <div class="h-16"></div>

    <!-- Conteúdo central -->
    <div class="flex-1 flex flex-col justify-center px-6 pb-12">
      <div class="w-full">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">
          Recuperar senha
        </h2>

        <div class="space-y-8">
          <!-- Etapa 1: Telefone -->
          <div v-if="!showOtpInput">
            <label class="block text-base font-medium text-gray-700 mb-3">
              Número de telefone
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <span class="text-gray-600 font-semibold text-lg">+244</span>
              </div>

              <input
                ref="phoneInput"
                v-model="displayPhone"
                type="tel"
                inputmode="numeric"
                pattern="[0-9\s]*"
                placeholder="912 345 678"
                maxlength="12"
                autocomplete="off"
                name="phone-hidden"
                :readonly="isPhoneReadonly"
                required
                class="w-full pl-24 pr-14 py-5 text-xl border-2 rounded-2xl focus:outline-none transition-all duration-200"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100': phoneError && phoneTouched,
                  'border-green-500 focus:border-green-500 focus:ring-green-100': phoneValid && phoneTouched && !phoneError,
                  'border-gray-300 focus:border-green-500 focus:ring-green-100': !phoneTouched || (!phoneError && !phoneValid)
                }"
                @focus="isPhoneReadonly = false; $nextTick(() => $refs.phoneInput.focus())"
                @blur="phoneTouched = true; validatePhone()"
              />

              <!-- Ícone de feedback -->
              <div class="absolute inset-y-0 right-5 flex items-center">
                <svg v-if="phoneValid && phoneTouched && !phoneError" class="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-if="phoneError && phoneTouched" class="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <!-- Erro temporário com X -->
            <div v-if="phoneError && phoneTouched" class="mt-2 flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100">
              <p class="text-sm text-red-600 font-medium">{{ phoneError }}</p>
              <button @click="clearPhoneError" class="text-red-600 hover:text-red-800">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Botão Enviar Código -->
            <button
              @click="handleSendOTP"
              :disabled="loading || cooldown > 0 || !phoneValid"
              class="mt-8 w-full py-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg v-if="loading" class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ cooldown > 0 ? `Reenviar em ${cooldown}s` : loading ? 'Enviando...' : 'Enviar Código SMS' }}
            </button>
          </div>

          <!-- Etapa 2: OTP -->
          <div v-if="showOtpInput" class="space-y-8">
            <div>
              <label class="block text-base font-medium text-gray-700 mb-3">
                Código recebido (6 dígitos)
              </label>
              <div class="relative">
                <input
                  v-model="otp"
                  type="text"
                  inputmode="numeric"
                  maxlength="6"
                  placeholder="______"
                  autocomplete="one-time-code"
                  required
                  class="w-full px-6 py-5 text-3xl font-bold text-center border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all tracking-[1em]"
                  :class="{
                    'border-red-500 focus:border-red-500 focus:ring-red-100': otpError && otpTouched,
                    'border-green-500 focus:border-green-500 focus:ring-green-100': otp.length === 6 && otp === requestOtp && !otpError
                  }"
                  @input="validateOtpInput"
                  @blur="otpTouched = true"
                />

                <!-- Ícone de feedback no OTP -->
                <div class="absolute inset-y-0 right-5 flex items-center">
                  <svg v-if="otp.length === 6 && otp === requestOtp && !otpError" class="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-if="otpError && otpTouched" class="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <!-- Erro OTP temporário com X -->
              <div v-if="otpError && otpTouched" class="mt-2 flex items-center justify-between bg-red-50 p-3 rounded-xl border border-red-100">
                <p class="text-sm text-red-600 font-medium">
                  {{ otpError }}
                </p>
                <button @click="otpError = ''" class="text-red-600 hover:text-red-800">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Botão Verificar -->
            <button
              @click="verifyOTP"
              :disabled="loading || otp.length !== 6"
              class="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg v-if="loading" class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ loading ? 'Verificando...' : 'Verificar Código' }}
            </button>

            <!-- Botão Voltar -->
            <button @click="resetOtpFlow" class="w-full py-4 bg-gray-100 text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-200 transition">
              Voltar
            </button>
          </div>

          <!-- Erro geral (toast com auto-sumir e X) -->
          <div v-if="error" class="fixed bottom-6 left-6 right-6 mx-auto max-w-md bg-red-600 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-fade-in-up">
            <span class="font-medium">{{ error }}</span>
            <button @click="error = ''" class="text-white hover:text-gray-200 focus:outline-none">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Link voltar para login -->
        <div class="mt-10 text-center">
          <router-link to="/" class="text-green-700 font-semibold text-lg hover:underline">
            Voltar para entrar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { sendOtp } from '@/utils/sendOTP'

const router = useRouter()

const phone = ref('')
const displayPhone = ref('')
const otp = ref('')
const requestOtp = ref(null)  // OTP retornado pelo sendOtp
const loading = ref(false)
const error = ref('')
const cooldown = ref(0)
const showOtpInput = ref(false)

const phoneError = ref('')
const phoneValid = ref(false)
const phoneTouched = ref(false)

const otpError = ref('')
const otpTouched = ref(false)

// Anti-autofill para telefone
const isPhoneReadonly = ref(true)

// Máscara do telefone
watch(displayPhone, (newVal) => {
  let digits = newVal.replace(/\D/g, '').slice(0, 9)

  let masked = digits
  if (digits.length >= 4) masked = digits.slice(0, 3) + ' ' + digits.slice(3)
  if (digits.length >= 7) masked = digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6)

  if (masked !== newVal) {
    nextTick(() => {
      displayPhone.value = masked
      phone.value = digits
      validatePhone()
    })
  } else {
    phone.value = digits
    validatePhone()
  }
})

// Validação do telefone
const validatePhone = () => {
  const digits = phone.value.trim()

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

// Validação do OTP em tempo real
const validateOtpInput = () => {
  otp.value = otp.value.replace(/\D/g, '').slice(0, 6)

  // Validação visual imediata (sem esperar blur)
  if (otp.value.length < 6) {
    otpError.value = 'Código incompleto (6 dígitos)'
  } else {
    otpError.value = ''
  }
}

// Enviar OTP
const handleSendOTP = async () => {
  phoneTouched.value = true
  validatePhone()

  if (!phoneValid.value) return

  loading.value = true
  error.value = ''

  try {
    const result = await sendOtp(phone.value.trim())
    requestOtp.value = result.otp  // guarda o OTP para comparação

    console.log('OTP gerado para teste:', requestOtp.value)

    showOtpInput.value = true
    startCooldown(60)
  } catch (err) {
    error.value = err.message || 'Erro ao enviar código'
    setTimeout(() => error.value = '', 5000)
  } finally {
    loading.value = false
  }
}

// Verificar OTP (com simulação de loading)
const verifyOTP = async () => {
  otpTouched.value = true

  if (otp.value.length !== 6) {
    otpError.value = 'Código incompleto (6 dígitos)'
    setTimeout(() => otpError.value = '', 4000)
    return
  }

  if (otp.value !== requestOtp.value) {
    otpError.value = 'Código incorreto'
    setTimeout(() => otpError.value = '', 4000)
    return
  }

  // Simulação de request (loading 2 segundos)
  loading.value = true

  // Espera 2 segundos simulando request ao backend
  await new Promise(resolve => setTimeout(resolve, 2000))

  loading.value = false

  // Sucesso: redireciona com query param
  router.push(`/reset-password?phone=${phone.value}`)
}

// Cooldown para reenviar
const startCooldown = (seconds) => {
  cooldown.value = seconds
  const timer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) clearInterval(timer)
  }, 1000)
}

// Limpar erro do telefone
const clearPhoneError = () => {
  phoneError.value = ''
}

// Resetar fluxo OTP
const resetOtpFlow = () => {
  showOtpInput.value = false
  otp.value = ''
  otpError.value = ''
  otpTouched.value = false
  cooldown.value = 0
  requestOtp.value = null
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