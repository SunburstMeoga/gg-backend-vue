export default [
  {
    title: "貨幣",
    route: "home",
    icon: "PackageIcon",
    action: 'read',
    resource: 'Auth',
    children:[
      {
        title: 'PMT',
        route: "coins-pmt",
        action: 'read',
        resource: 'Auth'
      },
      {
        title: 'MT',
        route: "coins-mt",
        action: 'read',
        resource: 'Auth'
      },
      {
        title: 'RT',
        route: "coins-rt",
        action: 'read',
        resource: 'Auth'
      },
      {
        title: 'BT',
        route: "coins-bt",
        action: 'read',
        resource: 'Auth'
      },
    ]
  },
  {
    title: "黑名單",
    route: "blacklist",
    icon: "UserXIcon",
    action: 'read',
    resource: 'Auth'
  },
  {
    title: "輪盤",
    route: "roulette",
    icon: "GiftIcon",
    action: 'read',
    resource: 'Auth'
  },
  {
    title: "市場",
    route:"",
    icon: "CommandIcon",
    children:[
      {
        title: '卡池',
        route: 'pool',
        action: 'read',
        resource: 'Auth'
      },
      {
        title: '回收和鑄造',
        route: 'casting',
        action: 'read',
        resource: 'Auth'
      }
    ]
  },
  {
    title: "統計",
    route:"",
    icon: "TrendingUpIcon",
    children:[
      {
        title: '每日',
        route: 'statistic',
        action: 'read',
        resource: 'Auth'
      },
      /* {
        title: '累計',
        route: 'statistic',
        action: 'read',
        resource: 'Auth'
      } */
    ]
  },
  {
    title: "設置",
    route:"",
    icon: "SettingsIcon",
    children:[
      {
        title: '用戶',
        route: 'users-list',
        action: 'read',
        resource: 'Auth'
      },
      {
        title: '權限',
        route: 'roles-list',
        action: 'read',
        resource: 'Auth'
      }
    ]
  }
];
