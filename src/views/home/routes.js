export default [
    {
        path: '/home',
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
            rootPage: 'home',
            title: 'Histórico'
        },
        component: () => import('./views/HistoryView.vue')
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        meta: {
            requiresAuth: true,
            rootPage: 'home',
            title: 'Retirar'
        },
        component: () => import('./views/WithdrawView.vue')
    },
      {
        path: '/profile',
        name: 'Profile',
        meta: {
            requiresAuth: true,
            rootPage: 'home',
            title: 'Meu Perfil'
        },
        component: () => import('./views/ProfileView.vue')
    },
    {
        path: '/notifications',
        name: 'Notifications',
        meta: {
            requiresAuth: true,
            rootPage: 'notifications',
            title: 'Notificações'
        },
        component: () => import('./views/NotificationsView.vue')
    }
]