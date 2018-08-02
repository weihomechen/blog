/* eslint-disable no-unused-vars */
import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getQuery } from '../utils/index';
import { login, register, getUserInfo, getUsers, logout, updatePassword } from '../services/app';

const { localStorage } = window;

export default {
  namespace: 'app',
  state: {
    menuPopoverVisible: false, // header是否显示下拉菜单
    passwordModalVisible: false,
    siderFold: false, // 是否显示侧边栏
    darkTheme: true,
    isNavbar: document.body.clientWidth < 769, // 是否使用导航菜单代替侧边栏
  },
  subscriptions: {
    setup({ dispatch }) {
      window.onresize = () => dispatch({ type: 'changeNavbar' });
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      const { success, msg, data: user } = res;
      if (success) {
        yield put({ type: 'loginSuccess', payload: { user } });
        // 登录成功后返回登录前的页面
        const backUrl = getQuery('backUrl') || '';
        yield put(routerRedux.push(decodeURIComponent(backUrl)));
      } else {
        message.error(msg);
        yield put({ type: 'loginFail' });
      }
    },
    * logout({ payload }, { call, put }) {
      const res = yield call(logout);
      const { success, msg } = res;
      if (success) {
        yield put({ type: 'logoutSuccess' });
        yield put(routerRedux.push('/'));
      } else {
        message.error(msg);
      }
    },
    * register({ payload }, { call, put }) {
      const res = yield call(register, payload);
      const { success, msg } = res;
      if (success) {
        message.success('账号申请成功');
        yield put(routerRedux.push('/login'));
      } else {
        message.error(msg);
      }
    },
    * switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' });
    },
    * changeTheme({ payload }, { put }) {
      yield put({ type: 'handleChangeTheme' });
    },
    * changeNavbar({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
    * switchMenuPopver({ payload }, { put }) {
      yield put({ type: 'handleSwitchMenuPopver' });
    },
    // 修改密码
    * changePassword({ payload }, { call, put }) {
      const { success, msg } = yield call(updatePassword, payload);
      if (success) {
        message.success('密码修改成功，请重新登录');
        const oldPassword = document.getElementById('old_password');
        const password = document.getElementById('new_password');
        oldPassword.value = password.value = '';
        yield put({ type: 'app/hidePasswordModal' });
        yield put({ type: 'logoutSuccess' });
        yield put({ type: 'routeChange', payload: { path: '/login' } });
      } else {
        message.error(msg);
      }
    },
    // 统一处理路由变化
    * routeChange({ payload = {} }, { put }) {
      const { path = '/' } = payload;
      yield put(routerRedux.push(path));
    },
    * isAdmin({ payload }, { put }) {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
      if (!(userInfo && userInfo.role)) {
        message.error('这个页面管理员大大才能进～');
        yield put({ type: 'routeChange' });
      }
    },
  },
  reducers: {
    handleSwitchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
    handleChangeTheme(state) {
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true,
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false,
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    showPasswordModal(state) {
      return { ...state, passwordModalVisible: true };
    },
    hidePasswordModal(state) {
      return { ...state, passwordModalVisible: false };
    },
  },
};
