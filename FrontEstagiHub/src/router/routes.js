const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: "dashboard", component: () => import('../pages/IndexPage.vue') },
      { path: 'usuarios', name: "usuarios", component: () => import('../pages/Usuarios.vue') },
      { path: 'usuarios/criarUsuario', name: "criarUsuario", component: () => import('../pages/CriarUsuario.vue') },
      { path: '/editarUsuario/:id', name:"editarUsuario", component: () => import('../pages/EditarUsuario.vue') , props: true },
      { path: 'estagiarios', name: "estagiarios", component: () => import('../pages/Estagiarios.vue') },
      { path: 'estagiarios/criarEstagiario', name: "criarEstagiario", component: () => import('../pages/CriarEstagiario.vue') },
      { path: '/editarEstagiario/:id', name:"editarEstagiario", component: () => import('../pages/EditarEstagiario.vue') , props: true },

    ]
  },

  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

