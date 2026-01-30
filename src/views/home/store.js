export default {
    state: {
        balance: 0,
        daily: {
            limit: 30,
            watched: 0,
            remaining: 30
        },
        monthly: {
            limit: 600,
            watched: 0,
            remaining: 600
        },
        loading: false,
        error: null,
        history: []  // para histórico de anúncios (opcional)
    },
    mutations: {
        SET_USER_DATA(state, data) {
            state.balance = data.balance ?? 0
            state.daily = { ...state.daily, ...data.daily }
            state.monthly = { ...state.monthly, ...data.monthly }
        },

        SET_LOADING(state, loading) {
            state.loading = loading
        },

        SET_ERROR(state, error) {
            state.error = error
        },

        CLEAR_ERROR(state) {
            state.error = null
        },

        UPDATE_AFTER_WATCH(state, payload) {
            // Atualiza os dados após assistir a um anúncio
            state.balance = payload.newBalance
            state.daily.watched = payload.adsWatchedToday
            state.daily.remaining = payload.adsRemainingToday
            state.monthly.watched = payload.adsWatchedThisMonth
            state.monthly.remaining = payload.adsRemainingThisMonth
        },

        SET_HISTORY(state, history) {
            state.history = history
        }
    },
    actions: {
        // Carregar dados do usuário (saldo + limites)
        async fetchUserData({ commit, state }) {
            if (!state.token) return
            try {
                const response = await axios.get(`${API_BASE}/ads/status`, {
                    headers: { 'x-auth-token': state.token }
                })
                commit('SET_USER_DATA', response.data)
            } catch (err) {
                console.error('Erro ao carregar dados do usuário:', err)
            }
        },

        // Assistir anúncio
        async watchAd({ commit, state }) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            try {
                // Aqui podes integrar o AdMob real (exemplo com promise simulada por agora)
                // await showRewardedAd()  // teu serviço AdMob

                const response = await axios.post(
                    `${API_BASE}/ads/watch`,
                    { videoId: `rewarded_${Date.now()}` },
                    { headers: { 'x-auth-token': state.token } }
                )

                commit('UPDATE_AFTER_WATCH', response.data)
                return response.data
            } catch (err) {
                const msg = err.response?.data?.msg || 'Não foi possível registar o anúncio.'
                commit('SET_ERROR', msg)
                throw err
            } finally {
                commit('SET_LOADING', false)
            }
        },

        // Solicitar saque
        async requestWithdrawal({ commit, state }, amount) {
            commit('SET_LOADING', true)
            commit('CLEAR_ERROR')
            try {
                const response = await axios.post(
                    `${API_BASE}/withdrawals/request`,
                    { amount },
                    { headers: { 'x-auth-token': state.token } }
                )
                // Atualiza saldo após sucesso
                commit('SET_USER_DATA', { ...state, balance: response.data.newBalance })
                return response.data
            } catch (err) {
                const msg = err.response?.data?.msg || 'Erro ao solicitar saque.'
                commit('SET_ERROR', msg)
                throw err
            } finally {
                commit('SET_LOADING', false)
            }
        },

        // Carregar histórico (opcional - se tiveres o endpoint)
        async fetchHistory({ commit, state }) {
            if (!state.token) return
            try {
                const response = await axios.get(`${API_BASE}/ads/history`, {
                    headers: { 'x-auth-token': state.token }
                })
                commit('SET_HISTORY', response.data.history || [])
            } catch (err) {
                console.error('Erro ao carregar histórico:', err)
            }
        }
    },
    getters: {
        canWatchAd: state =>
            state.daily.remaining > 0 && state.monthly.remaining > 0 && !state.loading,

        dailyProgress: state => (state.daily.watched / state.daily.limit) * 100,
        monthlyProgress: state => (state.monthly.watched / state.monthly.limit) * 100,

        // Novo: cálculo do Daily Streak
        dailyStreak: state => {
            if (state.watchHistory.length === 0) return 0

            // Ordena as datas (mais recente primeiro)
            const dates = state.watchHistory
                .map(h => parseISO(h.date))
                .sort((a, b) => b - a)  // descending

            let streak = 0
            let currentDate = new Date()

            for (let date of dates) {
                const diff = differenceInCalendarDays(currentDate, date)

                if (diff === 0 || diff === streak) {
                    // Mesmo dia ou dia consecutivo anterior
                    streak++
                    currentDate = subDays(currentDate, 1)
                } else if (diff > streak) {
                    // Quebrou a sequência
                    break
                }
            }

            // Se assistiu hoje, streak inclui o dia actual
            if (dates.some(d => isToday(d))) {
                return streak
            }

            return streak
        }
    }
}