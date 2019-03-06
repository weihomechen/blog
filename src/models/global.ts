import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {

  },

  effects: {
    * routeChange({ payload = {} }: any, { put }) {
      const { path = '/' } = payload;
      yield put(routerRedux.push(path));
    },
  },

  reducers: {

  },
};
