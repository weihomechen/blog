import { message } from 'antd';
import { routerRedux } from 'dva/router';

import {
  getList,
  getDetail,
  create,
  update,
} from '../services/team';

export default {
  namespace: 'team',

  state: {
    list: [], // 团队列表
    team: {}, // 当前的团队
  },

  effects: {
    // 获取团队列表
    * getList({ payload }, { call, put }) {
      const { success, data, msg } = yield call(getList, payload);
      if (success) {
        yield put({
          type: 'appendList',
          payload: data || [],
        });
      } else {
        yield new Promise((resolve) => {
          message.error(msg, 1, resolve);
        });

        yield put(routerRedux.push('/user/login'));
      }
    },
    // 获取团队详情
    * getDetail({ payload }, { call, put }) {
      const { success, data, msg } = yield call(getDetail, payload);
      if (success) {
        yield put({
          type: 'getDetailSuccess',
          payload: data || {},
        });
      } else {
        message.error(msg);
      }
    },
    * save({ payload }, { call }) {
      const { tid } = payload;
      const {
        success,
        msg,
      } = yield call(tid ? update : create, payload);

      return { success, msg };
    },
  },

  reducers: {
    appendList(state, action) {
      const list = action.payload;

      return {
        ...state,
        list,
      };
    },
    getDetailSuccess(state, action) {
      const team = action.payload;
      return {
        ...state,
        team,
      };
    },
  },
};
