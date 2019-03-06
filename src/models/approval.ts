import { message } from 'antd';
import { routerRedux } from 'dva/router';

import {
  getList,
  update,
} from '../services/approval';

export default {
  namespace: 'approval',

  state: {
    list: [],
    total: 0,
    unHandledCount: 0,
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { success, data, msg } = yield call(getList, payload);
      if (success) {
        const { record: list, totalCount: total, unHandledCount } = data;
        yield put({
          type: 'stateChange',
          payload: { list, total, unHandledCount },
        });
      } else {
        yield new Promise((resolve) => {
          message.error(msg, 2, resolve);
        });

        yield put(routerRedux.push('/blog/user/login'));
      }
    },
    * update({ payload }, { call }) {
      const { success, msg } = yield call(update, payload);
      return { success, msg };
    },
  },

  reducers: {
    stateChange(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
