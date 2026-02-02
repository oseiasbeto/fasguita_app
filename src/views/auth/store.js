import api from '../../api'

import clearSessionIdFromCookies from "@/utils/clear-session-id-from-cookies"; // Remove o session_id dos cookies.
import setSessionIdFromCookies from "@/utils/set-session-id-from-cookies"; // Armazena o session_id nos cookies.

import { logger } from '@/utils/logger';

export default {
    state: {
        user: null,
        token: null,
        sessionId: null
    },
    mutations: {
        SET_AUTH(state, { user, accessToken, sessionId }) {
            state.user = user
            state.token = accessToken
            state.sessionId = sessionId

            setSessionIdFromCookies(sessionId);
        },
        LOGOUT(state) {
            state.user = null
            state.token = null
            state.sessionId = null

            clearSessionIdFromCookies()
            disconnectSocket()
        },
        UPDATE_USER(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async register({ commit }, { phoneNumber, fullName, password }) {
            try {
                const response = await api.post('/auth/register', {
                    phone: phoneNumber,
                    fullName: fullName,
                    password: password
                })

                const { user, accessToken, sessionId } = response.data

                commit('SET_AUTH', {
                    user,
                    accessToken,
                    sessionId
                })
                logger.log("Usuário registrado com sucesso: " + user._id)
                return response.data
            } catch (err) {
                logger.error("Erro ao registrar usuário: " + err)
                throw err
            }
        },
        async checkPhoneExists({ commit }, phoneNumber) {
            try {
                const response = await api.get(`/auth/user/${phoneNumber}`)

                return response.data
            } catch (err) {
                // IMPORTANTE: re-throw para o frontend receber no catch
                logger.error('Erro ao buscar usuário por telefone:', err.response?.data || err)
                throw err  // <-- isso faz o .catch no componente funcionar
            }
        },
        async refreshToken({ commit }, sessionId) {
            try {
                const res = await api.post("/auth/refresh-token", {
                    sessionId: sessionId,
                });

                const user = res.data.user;
                const accessToken = res.data.accessToken;

                commit('SET_AUTH', {
                    user,
                    accessToken: accessToken,
                    sessionId: sessionId
                })
                return res
            } catch (err) {
                logger.error('Erro ao atualizar token de sessão:', err.message);
                throw err;
            }
        },
    },
    getters: {
        accessToken: (state) => state.token,
        currentUser: (state) => state.user,
    }
}