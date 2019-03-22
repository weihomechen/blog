export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './login/index' },
      { path: '/user/register', component: './register/index' },
    ],
  },
  {
    path: '/personal',
    component: '../layouts/SiderLayout',
    routes: [
      { path: '/personal', redirect: '/personal/profile' },
      { path: '/personal/account', component: './account/index' },
      { path: '/personal/article', component: './personalArticle/index' },
      { path: '/personal/approval', component: './approval/index' },
      { path: '/personal/feedback', component: './personalFeedback/index' },
      { path: '/personal/changeLog', component: './changeLog/index' },
      { path: '/personal/profile', component: './profile/index' },
    ],
  },
  {
    path: '/adminCenter',
    component: '../layouts/SiderLayout',
    routes: [
      { path: '/adminCenter', redirect: '/adminCenter/cateManage' },
      { path: '/adminCenter/cateManage', component: './cateManage/index' },
      { path: '/adminCenter/messageSender', component: './messageSender/index' },
    ],
  },
  {
    path: '/team',
    component: '../layouts/TeamLayout',
    routes: [
      { path: '/team/:tid', component: './team/index' },
    ],
  },
  {
    path: '/personalPage',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/personalPage/:uid', component: './personalPage/index' },
    ],
  },
  {
    path: '/mc',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/mc', component: './mc/index' },
    ],
  },
  {
    path: '/article',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/article/detail/:id', component: './articleDetail/index' },
      { path: '/article/edit/:id?', component: './articleEdit/index' },
    ],
  },
  {
    path: '/search',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/search', component: './search/index' },
    ],
  },
  {
    path: '/feedback',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/feedback', component: './feedback/index' },
      { path: '/feedback/detail/:id', component: './feedbackDetail/index' },
      { path: '/feedback/edit/:id?', component: './feedbackEdit/index' },
    ],
  },
  {
    path: '/error',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/error', component: './error/index' },
    ],
  },
  {
    path: '/',
    exact: false,
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './home/index' },
    ],
  }
]
