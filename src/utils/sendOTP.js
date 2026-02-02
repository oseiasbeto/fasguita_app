// src/utils/sendOtp.js
import axios from 'axios'

/**
 * Envia OTP via Twilio diretamente do frontend
 * @param {string} phone - Número sem +244 (ex: '912345678')
 * @returns {Promise<{otp: string, msg: string}>}
 */

export const sendOtp = async (phone) => {

    // Credenciais do Twilio (devem vir do .env)
    const apiUrl = 'https://api.querosms.com/api/v1/sms/send'
    const apiKey = 'qsms_594069850604f7c474e318e2f7156a5df1a946380fb9e597fc449f5ce1744110'
    const senderId = 'MS22400753DFW6BF'

    // Gera OTP de 6 dígitos
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const normalized = phone.replace(/\D/g, '')
    const message = `Seu código OTP é: ${otp}`

    if (!normalized.match(/^9[1-9]\d{7}$/)) {
        throw new Error('Número de telefone inválido. Use formato 912345678')
    }

    try {
        // Requisição POST para a API do Twilio usando Axios
        const response = await axios.post(apiUrl, {
            to: normalized,
            messaging_service_sid: senderId,
            message
        }, {
            headers: {
                'X-QueroSMS-API-Key': apiKey,
                "Content-Type": "application/json",
            },
        })

        if (response.status !== 200) {
            throw new Error('Falha ao enviar SMS')
        }

        // Em produção, NÃO retorne o OTP real!
        // Aqui retornamos para teste/local. Em produção, o backend deve validar.
        console.log(`OTP enviado com sucesso para +244${normalized}: ${otp}`)

        return {
            otp, // Apenas para teste/dev. Remova em produção!
            msg: 'Código enviado por SMS. Verifique suas mensagens.'
        }
    } catch (err) {
        console.error('Erro ao enviar OTP:', err)

        if (err.response) {
            const errorData = err.response.data
            throw new Error(errorData.message || 'Falha na comunicação com o serviço de SMS')
        }

        throw err
    }
}