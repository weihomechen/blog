import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/ifun/my-projects/blog/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    redirect: '/user/login',
    exact: true,
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/personal',
    redirect: '/personal/profile',
    exact: true,
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/adminCenter',
    redirect: '/adminCenter/cateManage',
    exact: true,
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index'),
            })
          : require('../login/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/user/register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__register__index" */ '../register/index'),
            })
          : require('../register/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/personal',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SiderLayout" */ '../../layouts/SiderLayout'),
        })
      : require('../../layouts/SiderLayout').default,
    routes: [
      {
        path: '/personal/account',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__account__index" */ '../account/index'),
            })
          : require('../account/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/personal/article',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__personalArticle__index" */ '../personalArticle/index'),
            })
          : require('../personalArticle/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/personal/approval',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__approval__index" */ '../approval/index'),
            })
          : require('../approval/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/personal/feedback',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__personalFeedback__index" */ '../personalFeedback/index'),
            })
          : require('../personalFeedback/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/personal/changeLog',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__changeLog__index" */ '../changeLog/index'),
            })
          : require('../changeLog/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/personal/profile',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__profile__index" */ '../profile/index'),
            })
          : require('../profile/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/adminCenter',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SiderLayout" */ '../../layouts/SiderLayout'),
        })
      : require('../../layouts/SiderLayout').default,
    routes: [
      {
        path: '/adminCenter/cateManage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__cateManage__index" */ '../cateManage/index'),
            })
          : require('../cateManage/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/adminCenter/messageSender',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__messageSender__index" */ '../messageSender/index'),
            })
          : require('../messageSender/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/team',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__TeamLayout" */ '../../layouts/TeamLayout'),
        })
      : require('../../layouts/TeamLayout').default,
    routes: [
      {
        path: '/team/:tid',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__team__index" */ '../team/index'),
            })
          : require('../team/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/personalPage',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/personalPage/:uid',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__personalPage__index" */ '../personalPage/index'),
            })
          : require('../personalPage/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/mc',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/mc',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__mc__index" */ '../mc/index'),
            })
          : require('../mc/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/article',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/article/detail/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__articleDetail__index" */ '../articleDetail/index'),
            })
          : require('../articleDetail/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/article/edit/:id?',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__articleEdit__index" */ '../articleEdit/index'),
            })
          : require('../articleEdit/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/search',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/search',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__search__index" */ '../search/index'),
            })
          : require('../search/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/feedback',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/feedback',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__feedback__index" */ '../feedback/index'),
            })
          : require('../feedback/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/feedback/detail/:id',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__feedbackDetail__index" */ '../feedbackDetail/index'),
            })
          : require('../feedbackDetail/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        path: '/feedback/edit/:id?',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__feedbackEdit__index" */ '../feedbackEdit/index'),
            })
          : require('../feedbackEdit/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/error',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/error',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__error__index" */ '../error/index'),
            })
          : require('../error/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    path: '/',
    exact: false,
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__home__index" */ '../home/index'),
            })
          : require('../home/index').default,
        exact: true,
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'Rulifun Blog',
        _title_default: 'Rulifun Blog',
      },
    ],
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'Rulifun Blog',
    _title_default: 'Rulifun Blog',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
