import 'babel-polyfill';
import dva from 'dva';
import { message } from 'antd';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';

import router from './router';
import globalModel from './models/global';

import './index.css';

const loading = {
  global: false,
  models: {
    article: false,
    adminCenter: false,
    personCenter: false,
    team: false,
    category: false,
    approval: false,
  },
};

const app = dva({
  ...createLoading(loading),
  history: createHistory({
    basename: '/blog',
  }),
  onError(error) {
    console.log(error);
    message.error('出现故障了😫，请重新登录', 2);
  },
});

app.model(globalModel);

app.router(router);

app.start('#app');
