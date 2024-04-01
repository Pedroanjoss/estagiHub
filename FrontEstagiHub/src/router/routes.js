const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: "dashboard", component: () => import('../pages/IndexPage.vue') },
      { path: 'estagiarios', name: "estagiarios", component: () => import('../pages/Estagiarios.vue') },
      { path: 'users', name: "users", component: () => import('../pages/Users.vue') },
      { path: 'estagiarios/criarEstagiario', name: "criarEstagiario", component: () => import('../pages/CriarEstagiario.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

