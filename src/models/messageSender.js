import { routerRedux } from 'dva/router';
import {
  send,
} from '../services/mc'

export default {
  namespace: 'messageSender',

  state: {

  },

  effects: {
    * submitSend({ payload = {} }, { select, call, put }) {
      payload.type = 3;
      const { users } = yield select(state => state.user);
      const uidList = users.map(v => v.uid);
      payload.receiver = uidList.join(',');
      const { success, msg } = yield call(send, payload);
      return { success, msg };
    },
  },

  reducers: {

  },
};
