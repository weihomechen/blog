import { message } from 'antd';
import {
  query,
  getDetail,
  saveIssue,
  closeIssue,
  addReply,
  delReply,
} from '../services/feedback';

export default {
  namespace: 'feedback',

  state: {
    issue: {
      type: 0,
      content: null,
    },
    issueList: [],
    total: 0,
  },

  effects: {
    * getList({ payload }, { call, put }) {
      const { success, data, msg } = yield call(query, payload);
      if (success) {
        yield put({
          type: 'getListSuccess',
          payload: data,
        });
      } else {
        message.error(msg);
      }
    },
    * getDetail({ payload }, { call, put }) {
      const res = yield call(getDetail, payload);
      const { success, msg, data } = res;
      if (success) {
        if (data.issue) {
          yield put({ type: 'getDetailSuccess', payload: { data } });
        } else {
          yield put({ type: 'global/routeChange', payload: { path: '/error' } });
        }
      } else {
        message.error(msg);
      }
    },
    * saveIssue({ payload }, { select, call, put }) {
      let { issue } = yield select(state => state.feedback);
      const { user } = yield select(state => state.user);
      if (!user.uid) {
        message.error('提交反馈前请先登录');
        return { success: false };
      }
      if (!issue.title) {
        message.error('请填写标题');
        return { success: false };
      }
      const { content } = payload;
      issue = {
        ...issue,
        content,
      };
      const { success, msg } = yield call(saveIssue, issue);
      if (success) {
        yield put({ type: 'saveSuccess' });
      } else {
        message.error(msg);
      }
      return { success, msg };
    },
    * closeIssue({ payload }, { call }) {
      const { success, msg } = yield call(closeIssue, payload);
      return { success, msg };
    },
    * submitReply({ payload }, { select, call }) {
      const { user } = yield select(state => state.user);
      const { issue } = yield select(state => state.feedback);
      const { uid: author } = user;
      const { id: issue_id } = issue;
      if (author) {
        payload = {
          ...payload,
          author,
          issue_id,
        };
        const { success, msg } = yield call(addReply, payload);
        return { success, msg };
      }
      message.error('回复前请先登录哦～');
      return { success: false };
    },
    * delReply({ payload }, { select, call }) {
      const { user } = yield select(state => state.user);
      const operator = user.uid;
      const { success, msg } = yield call(delReply, {
        id: payload.id,
        operator,
        status: 0,
      });
      return { success, msg };
    },
  },

  reducers: {
    initIssue(state) {
      return {
        ...state,
        issue: {
          type: 0,
        },
      };
    },
    DTOChange(state, action) {
      let { issue } = state;
      issue = { ...issue, ...action.payload };
      return {
        ...state,
        issue,
      };
    },
    getListSuccess(state, action) {
      const { record: issueList, totalCount: total = 0 } = action.payload;
      return {
        ...state,
        issueList,
        total,
      };
    },
    getDetailSuccess(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
      };
    },
    saveSuccess(state) {
      return {
        ...state,
        issue: {
          type: 0,
        },
      };
    },
  },
};
