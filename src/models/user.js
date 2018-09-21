import { routerRedux } from 'dva/router';
import { message } from 'antd';

import {
  login,
  register,
  join,
  getUserInfo,
  getUsers,
  logout,
  update,
  exitTeam,
  kicked,
  getActiveUsers,
  invite,
} from '../services/user';

import { getQuery } from '../utils';
import io from '../common/io';

export default {
  namespace: 'user',

  state: {
    user: {}, // 当前登录的用户
    users: [], // 用户集合
    activeUsers: [], // 活跃用户排行
  },

  subscriptions: {
    setup({ dispatch }) {
      window.onload = () => dispatch({ type: 'getUsers' }); // 取消取当前用户信息，刷新后页面需要用到用户集合信息，如文章详情页
    },
  },

  effects: {
    // 获取用户集合
    * getUsers({ payload }, { call, put }) {
      const res = yield call(getUsers);
      const { success, data: users, code } = res;
      if (success) {
        yield put({ type: 'getUsersSuccess', payload: { users } });
      } else {
        console.log('获取用户列表失败');
        if (code === 'user need login') {
          yield put(routerRedux.push('/user/login'));
        }
      }
    },
    // 获取活跃用户集合
    * getActiveUsers({ payload }, { call, put }) {
      const res = yield call(getActiveUsers);
      const { success, data: activeUsers } = res;
      if (success) {
        yield put({ type: 'stateChange', payload: { activeUsers } });
      } else {
        console.log('获取活跃用户列表失败');
      }
    },
    * login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      const { success, msg } = res;
      if (success) {
        yield put({ type: 'queryUser' });
        // 登录成功后返回登录前的页面
        const backUrl = getQuery('backUrl') || '';
        yield put(routerRedux.push(decodeURIComponent(backUrl)));
        io();
      } else {
        message.error(msg);
      }
    },
    * logout({ payload }, { call, put }) {
      const res = yield call(logout);
      const { success, msg } = res;
      if (success) {
        yield put({ type: 'logoutSuccess' });
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error(msg);
      }
    },
    * register({ payload }, { call, put }) {
      const res = yield call(register, payload);
      const { success, msg } = res;
      if (success) {
        message.success('账号注册成功');
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error(msg);
      }
    },
    * join({ payload }, { call }) {
      const {
        success,
        msg,
      } = yield call(join, payload);

      if (success) {
        message.info('申请成功，请留意未读消息获取申请进度', 2);
      } else {
        message.error(msg);
      }
    },
    * queryUser({ payload }, { call, put }) {
      const { success, data = {}, msg } = yield call(getUserInfo);
      if (success) {
        if (data.uid) {
          yield put({
            type: 'getUserInfoSuccess',
            payload: { user: data },
          });
        } else {
          yield put({ type: 'article/stateChange', payload: { isEditing: false } });
          message.error('获取用户信息失败，请重新登录', 2);
          yield put(routerRedux.push('/user/login'));
        }
      } else {
        message.error(msg);
      }
    },
    * update({ payload }, { call, put }) {
      const { success, msg } = yield call(update, payload);
      if (success) {
        message.success('修改个人资料成功，请重新登录');
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error(msg);
      }
    },
    * exitTeam({ payload }, { call, put }) {
      const { success, msg } = yield call(exitTeam, payload);
      if (success) {
        message.success('退出团队成功，请重新登录');
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error(msg);
      }
    },
    * kicked({ payload }, { call }) {
      const { success, msg } = yield call(kicked, payload);
      if (success) {
        message.success('踢出成功', 2, () => window.location.reload());
      } else {
        message.error(msg);
      }
    },
    * invite({ payload }, { call }) {
      const { success, msg } = yield call(invite, payload);
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
    getUserInfoSuccess(state, action) {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    },
    getUsersSuccess(state, action) {
      const { users } = action.payload;
      return {
        ...state,
        users,
      };
    },
  },
};
