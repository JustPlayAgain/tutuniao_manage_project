export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['Caa_Mxh_Cn', 'tutuniao'],
    routes: [
      { path: '/', redirect: '/activity/list' },
      {
        path: '/guoMei',
        icon: 'form',
        name: 'guoMei',
        routes: [
          {
            path: '/guoMei/guoMeiList',
            name: 'searchtable',
            component: './GuoMei/guoMeiList',
          },
          {
            path: '/guoMei/add',
            name: 'add',
            component: './GuoMei/addGuoMei',
          },
          {
            path: '/guoMei/uploadFile',
            name: 'uploadFile',
            component: './GuoMei/uploadGuoMei',
          },
        ],
      },
      {
        path: '/activity',
        icon: 'table',
        name: 'activity',
        routes: [
          {
            path: '/activity/list',
            name: 'list',
            // component: './List/TableList',
            component: './Activity/activityList',
          },
          {
            path: '/activity/add',
            name: 'add',
            // component: './List/TableList',
            component: './Activity/addActivity',
          },
        ],
      },
      {
        path: '/news',
        icon: 'profile',
        name: 'news',
        routes: [
          {
            path: '/news/newsList',
            name: 'newslist',
            component: './News/newsList',
          },
          {
            path: '/news/add',
            name: 'add',
            component: './News/addNews',
          },
        ],
      },
      {
        path: '/match',
        icon: 'dashboard',
        name: 'match',
        routes: [
          {
            path: '/match/matchList',
            name: 'list',
            component: './Match/matchList',
          },
          {
            path: '/match/addMatch',
            name: 'addMatch',
            component: './Match/addMatch',
          },
          {
            path: '/match/uploadFile',
            name: 'uploadFile',
            component: './Match/uploadMatch',
          },
        ],
      },
    ],
  },
];
