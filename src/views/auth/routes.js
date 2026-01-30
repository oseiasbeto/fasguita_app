export default [
    {
        path: '/',
        name: 'Login',
        meta: {
            routeAuth: true,
            rootPage: 'auth',
            title: 'Login'
        },
        component: () => import('./views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            routeAuth: true,
            rootPage: 'auth',
            title: 'Register'
        },
        component: () => import('./views/RegisterView.vue')
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        meta: {
            routeAuth: true,
            rootPage: 'auth',
            title: 'Esqueci a senha'
        },
        component: () => import('./views/ForgotPassword.vue')
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        meta: {
            routeAuth: true,
            rootPage: 'auth',
            title: 'Redefinir senha'
        },
        component: () => import('./views/ResetPasswordView.vue')
    },
]