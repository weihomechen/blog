import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/ifun/my-projects/blog/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true,
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/personal",
    "redirect": "/personal/profile",
    "exact": true,
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/adminCenter",
    "redirect": "/adminCenter/cateManage",
    "exact": true,
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  
}),
    "routes": [
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__login__index" */'../login/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__register__index" */'../register/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/personal",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__SiderLayout" */'../../layouts/SiderLayout'),
  
}),
    "routes": [
      {
        "path": "/personal/account",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__account__index" */'../account/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/personal/article",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__personalArticle__index" */'../personalArticle/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/personal/approval",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__approval__index" */'../approval/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/personal/feedback",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__personalFeedback__index" */'../personalFeedback/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/personal/changeLog",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__changeLog__index" */'../changeLog/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/personal/profile",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__profile__index" */'../profile/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/adminCenter",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__SiderLayout" */'../../layouts/SiderLayout'),
  
}),
    "routes": [
      {
        "path": "/adminCenter/cateManage",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__cateManage__index" */'../cateManage/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/adminCenter/messageSender",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__messageSender__index" */'../messageSender/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/team",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__TeamLayout" */'../../layouts/TeamLayout'),
  
}),
    "routes": [
      {
        "path": "/team/:tid",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__team__index" */'../team/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/personalPage",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/personalPage/:uid",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__personalPage__index" */'../personalPage/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/mc",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/mc",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__mc__index" */'../mc/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/article",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/article/detail/:id",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__articleDetail__index" */'../articleDetail/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/article/edit/:id?",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__articleEdit__index" */'../articleEdit/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/search",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/search",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__search__index" */'../search/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/feedback",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/feedback",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__feedback__index" */'../feedback/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/feedback/detail/:id",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__feedbackDetail__index" */'../feedbackDetail/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "path": "/feedback/edit/:id?",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__feedbackEdit__index" */'../feedbackEdit/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/error",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/error",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__error__index" */'../error/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "path": "/",
    "exact": false,
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  
}),
    "routes": [
      {
        "path": "/",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__home__index" */'../home/index'),
  
}),
        "exact": true,
        "_title": "blog",
        "_title_default": "blog"
      },
      {
        "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "blog",
        "_title_default": "blog"
      }
    ],
    "_title": "blog",
    "_title_default": "blog"
  },
  {
    "component": () => React.createElement(require('/Users/ifun/my-projects/blog/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
    "_title": "blog",
    "_title_default": "blog"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
