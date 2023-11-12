export default [
  //货币
  {
    path: "/coins/wgt",
    name: "coins-wgt",
    component: () => import("@/views/coin/Coin.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/coins/wgt-a",
    name: "coins-wgt-a",
    component: () => import("@/views/coin/Coin.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  //市场
  {
    path: "/market/campaign-token",
    name: "campaign-token",
    component: () => import("@/views/market/Card.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/market/character-card",
    name: "character-card",
    component: () => import("@/views/market/Card.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/market/scrooge-card",
    name: "scrooge-card",
    component: () => import("@/views/market/Card.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  //设置
  {
    path: "/setting/income-offerings",
    name: "income-offerings",
    component: () => import("@/views/setting/incomeOfferings.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  //权限
  {
    path: "/competence/consult",
    name: "competence-consult",
    component: () => import("@/views/competence/consult.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/competence/blacklist",
    name: "competence-blacklist",
    component: () => import("@/views/blacklist/Blacklist.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  //铸造
  {
    path: "/casting",
    name: "casting",
    component: () => import("@/views/casting/Casting.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },

  {
    path: "/market/wild-card",
    name: "wild-card",
    component: () => import("@/views/market/Card.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/market/composite-card",
    name: "composite-card",
    component: () => import("@/views/market/Card.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },

  {
    path: "/statistic",
    name: "statistic",
    component: () => import("@/views/statistic/Statistic.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  // {
  //   path: "/casting",
  //   name: "casting",
  //   component: () => import("@/views/casting/Casting.vue"),
  //   meta: {
  //     action: "read",
  //     resource: "Auth",
  //   },
  // },
  {
    path: "/roles/list",
    name: "roles-list",
    component: () => import("@/views/role/roles-list/RolesList.vue"),
    meta: {
      action: "read",
      resource: "roles",
    },
  },
  {
    path: "/roles/edit/:id",
    name: "roles-edit",
    component: () => import("@/views/role/roles-edit/RolesEdit.vue"),
    meta: {
      action: "read",
      resource: "roles",
    },
  },
  {
    path: "/pool",
    name: "pool",
    component: () => import("@/views/pool/Pool.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/blacklist",
    name: "blacklist",
    component: () => import("@/views/blacklist/Blacklist.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/roulette",
    name: "roulette",
    component: () => import("@/views/roulette/Roulette.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/coins/rt",
    name: "coins-rt",
    component: () => import("@/views/coin/Coin.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/coins/bt",
    name: "coins-bt",
    component: () => import("@/views/coin/Coin.vue"),
    meta: {
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "/users/list",
    name: "users-list",
    component: () => import("@/views/user/users-list/UsersList.vue"),
    meta: {
      action: "read",
      resource: "users",
    },
  },
  {
    path: "/users/view/:id",
    name: "users-view",
    component: () => import("@/views/user/users-view/UsersView.vue"),
    meta: {
      action: "read",
      resource: "users",
    },
  },
  {
    path: "/users/edit/:id",
    name: "users-edit",
    component: () => import("@/views/user/users-edit/UsersEdit.vue"),
    meta: {
      action: "update",
      resource: "users",
    },
  },
  {
    path: "/users/create",
    name: "users-create",
    component: () => import("@/views/user/users-edit/UsersEdit.vue"),
    meta: {
      action: "create",
      resource: "users",
    },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/views/pages/authentication/Login.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/forgot",
    name: "auth-forgot-password-v2",
    component: () =>
      import("@/views/pages/authentication/ForgotPassword-v2.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/coin/Coin.vue"),
    /*
        meta: {
          pageTitle: 'Home',
          breadcrumb: [
            {
              text: 'Home',
              active: true,
            },
          ],
        },
        */
  },
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/pages/not-authorized",
    name: "not-authorized",
    // ! Update import path
    component: () => import("@/views/pages/miscellaneous/NotAuthorized.vue"),
    meta: {
      layout: "full",
      action: "read",
      resource: "Auth",
    },
  },
  {
    path: "*",
    redirect: "error-404",
  },
];
