const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../pages/IndexPage.vue'),
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: () => import('../pages/usuario/Usuarios.vue'),
      },
      {
        path: 'usuarios/criarUsuario',
        name: 'criarUsuario',
        component: () => import('../pages/usuario/CriarUsuario.vue'),
      },
      {
        path: '/editarUsuario/:id',
        name: 'editarUsuario',
        component: () => import('../pages/usuario/EditarUsuario.vue'),
        props: true,
      },
      {
        path: 'estagiarios',
        name: 'estagiarios',
        component: () => import('../pages/estagiario/Estagiarios.vue'),
      },
      {
        path: 'estagiarios/criarEstagiario',
        name: 'criarEstagiario',
        component: () => import('../pages/estagiario/CriarEstagiario.vue'),
      },
      {
        path: '/editarEstagiario/:id',
        name: 'editarEstagiario',
        component: () => import('../pages/estagiario/EditarEstagiario.vue'),
        props: true,
      },
      {
        path: '/contratos/:id',
        name: 'contratos',
        component: () => import('../pages/contratos/Contratos.vue'),
        props: true,
      },
      {
        path: '/contratos/criarContrato/:estagiarioId',
        name: 'criarContrato',
        component: () => import('../pages/contratos/CriarContrato.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
