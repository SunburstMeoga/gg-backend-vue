export default [
  {
    title: "貨幣",
    route: "home",
    icon: "PackageIcon",
    action: "read",
    resource: "Auth",
    children: [
      {
        title: "WGT",
        route: "coins-wgt",
        action: "read",
        resource: "Auth",
      },
      {
        title: "WGT-A",
        route: "coins-wgt-a",
        action: "read",
        resource: "Auth",
      },
      {
        title: "RT",
        route: "coins-rt",
        action: "read",
        resource: "Auth",
      },
      {
        title: "BT",
        route: "coins-bt",
        action: "read",
        resource: "Auth",
      },
    ],
  },
  {
    title: "市場",
    route: "",
    icon: "CommandIcon",
    children: [
      {
        title: "角色卡",
        route: "character-card",
        action: "read",
        resource: "Auth",
      },
      {
        title: "出征令牌",
        route: "campaign-token",
        action: "read",
        resource: "Auth",
      },
      {
        title: "财神卡",
        route: "scrooge-card",
        action: "read",
        resource: "Auth",
      },
      {
        title: "战法道具卡",
        route: "wild-card",
        action: "read",
        resource: "Auth",
      },
      {
        title: "合成道具卡",
        route: "composite-card",
        action: "read",
        resource: "Auth",
      },
    ],
  },
  {
    title: "設置",
    route: "",
    icon: "SettingsIcon",
    children: [
      {
        title: "收益和发售",
        route: "income-offerings",
        action: "read",
        resource: "Auth",
      },
      // {
      //   title: "權限",
      //   route: "roles-list",
      //   action: "read",
      //   resource: "Auth",
      // },
    ],
  },
  {
    title: "权限",
    route: "",
    icon: "SettingsIcon",
    children: [
      {
        title: "查询",
        route: "competence-consult",
        action: "read",
        resource: "Auth",
      },
      {
        title: "黑名单",
        route: "competence-blacklist",
        action: "read",
        resource: "Auth",
      },
    ],
  },
  {
    title: "铸造",
    route: "blacklist",
    icon: "UserXIcon",
    action: "read",
    resource: "Auth",
  },
  {
    title: "黑名單",
    route: "blacklist",
    icon: "UserXIcon",
    action: "read",
    resource: "Auth",
  },
  {
    title: "輪盤",
    route: "roulette",
    icon: "GiftIcon",
    action: "read",
    resource: "Auth",
  },

  {
    title: "統計",
    route: "",
    icon: "TrendingUpIcon",
    children: [
      {
        title: "每日",
        route: "statistic",
        action: "read",
        resource: "Auth",
      },
      /* {
        title: '累計',
        route: 'statistic',
        action: 'read',
        resource: 'Auth'
      } */
    ],
  },
];
