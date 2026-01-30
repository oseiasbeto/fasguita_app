export default [
    {
        path: '/',
        name: 'Home',
        meta: {
            requiresAuth: true,
            rootPage: 'home',
            title: 'Pagina Inicial'
        },
        component: () => import('./views/HomeView.vue')
    },
    {
        path: '/history',
        name: 'History',
        meta: {
            requiresAuth: true,
            rootPage: 'history',
            title: 'Histórico'
        },
        component: () => import('./views/HistoryView.vue')
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        meta: {
            requiresAuth: true,
            rootPage: 'withdraw',
            title: 'Retirar'
        },
        component: () => import('./views/WithdrawView.vue')
    }
]