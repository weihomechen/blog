import dynamicWrapper from '../utils/dynamicWrapper';
// import dynamic from '_dva@2.1.0@dva/dynamic';

export default (app) => [
  {
    exact: true,
    path: '/user/login',
    component: dynamicWrapper(app, [], () => import('../routes/login/index.js')),
    layout: 'userLayout',
  },
  {
    exact: true,
    path: '/user/register',
    component: dynamicWrapper(app, [], () => import('../routes/register/index.js')),
    layout: 'userLayout',
  },
  {
    exact: true,
    path: '/personal/profile',
    component: dynamicWrapper(app, ['article'], () => import('../routes/profile/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personal/account',
    component: dynamicWrapper(app, ['article'], () => import('../routes/account/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personal/article',
    component: dynamicWrapper(app, ['article'], () => import('../routes/personalArticle/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personal/approval',
    component: dynamicWrapper(app, ['approval'], () => import('../routes/approval/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personal/feedback',
    component: dynamicWrapper(app, ['feedback'], () => import('../routes/personalFeedback/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personal/changeLog',
    component: dynamicWrapper(app, [], () => import('../routes/changeLog/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/personalPage/:uid',
    component: dynamicWrapper(app, ['team', 'article'], () => import('../routes/personalPage/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/team/:tid',
    component: dynamicWrapper(app, ['team', 'article'], () => import('../routes/team/index.js')),
    layout: 'teamLayout',
  },
  {
    exact: true,
    path: '/article/detail/:id',
    component: dynamicWrapper(app, ['article'], () => import('../routes/articleDetail/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/article/edit/:id?',
    component: dynamicWrapper(app, ['article', 'category'], () => import('../routes/articleEdit/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/mc',
    component: dynamicWrapper(app, ['mc'], () => import('../routes/mc/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/adminCenter/messageSender',
    component: dynamicWrapper(app, ['user', 'team', 'mc', 'messageSender'], () => import('../routes/messageSender/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/adminCenter/cateManage',
    component: dynamicWrapper(app, ['category'], () => import('../routes/cateManage/index.js')),
    layout: 'siderLayout',
  },
  {
    exact: true,
    path: '/search',
    component: dynamicWrapper(app, ['article', 'user', 'category'], () => import('../routes/search/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/feedback',
    component: dynamicWrapper(app, ['feedback'], () => import('../routes/feedback/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/feedback/detail/:id',
    component: dynamicWrapper(app, ['feedback'], () => import('../routes/feedbackDetail/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/feedback/edit/:id?',
    component: dynamicWrapper(app, ['feedback'], () => import('../routes/feedbackEdit/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/error',
    component: dynamicWrapper(app, [], () => import('../routes/error/index.js')),
    layout: 'basicLayout',
  },
  {
    exact: true,
    path: '/',
    component: dynamicWrapper(app, ['team', 'article', 'category'], () => import('../routes/home/index.js')),
    layout: 'basicLayout',
  },
  {
    path: '/',
    component: dynamicWrapper(app, [], () => import('../routes/error/index.js')),
    layout: 'basicLayout',
  },
];
