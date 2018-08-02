import { message } from 'antd';
import { routerRedux } from 'dva/router';

import {
  getList,
  update,
  getUnReadTotal,
} from '../services/mc';

export default {
  namespace: 'mc',

  state: {
    discussMsgList: [],
    systemMsgList: [],
    discussMsgTotal: 0,
    systemMsgTotal: 0,
    unReadTotal: 0,
    unReadSysMsgTotal: 0,
    unReadDisMsgTotal: 0,
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { success, data, msg } = yield call(getList, payload);
      if (success) {
        const { type } = payload;
        const { record, totalCount } = data;
        yield put({
          type: 'appendList',
          payload: +type === 2 ? {
            discussMsgList: record,
            discussMsgTotal: totalCount,
          } :
            {
              systemMsgList: record,
              systemMsgTotal: totalCount,
            },
        });
      } else {
        yield new Promise((resolve) => {
          message.error(msg, 1, resolve);
        });
        yield put(routerRedux.push('/user/login'));
      }

      return { success, msg };
    },
    * changeStatus({ payload }, { call }) {
      const { success, msg } = yield call(update, payload);
      return { success, msg };
    },
    * getUnReadTotal({ payload }, { call, put }) {
      const { success, data, msg } = yield call(getUnReadTotal, payload);
      if (success) {
        yield put({
          type: 'stateChange',
          payload: data,
        });
      } else {
        yield new Promise((resolve) => {
          message.error(msg, 1, resolve);
        });
      }
      return { success };
    },
  },

  reducers: {
    stateChange(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
