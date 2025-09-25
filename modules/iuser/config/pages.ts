const layout = 'blank'
const pages = [
  {
    name: 'iuser.auth-login',
    path: '/auth/login',
    page: 'runtime/pages/auth/auth-login.vue',
    meta: {layout},
  },
  {
    name: 'iuser.auth-logout',
    path: '/auth/logout',
    page: 'runtime/pages/auth/auth-logout.vue',
    meta: {layout},
  },
  {
    name: 'iuser.no-access',
    path: '/auth/no-access',
    page: 'runtime/pages/auth/no-access.vue',
    meta: {layout},
  },
  {
    name: 'iuser.request-token',
    path: '/auth/request-token',
    page: 'runtime/pages/auth/request-token.vue',
    meta: {layout},
  },
  {
    name: 'iuser.reset-password',
    path: '/auth/reset-password',
    page: 'runtime/pages/auth/reset-password.vue',
    meta: {layout},
  }

]

export default pages
