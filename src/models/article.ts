import { message } from 'antd';

import {
  query,
  getDetail,
  saveArticle,
  removeArticle,
  addComment,
  delComment,
  addReply,
  delReply,
} from '../services/article';

const initialArticle = JSON.stringify({
  title: '',
  abstract: '',
  author: '',
  content: null,
});

const initialState = JSON.stringify({
  // 文章列表
  list: [],
  total: 0,
  // 文章详情和编辑
  article: JSON.parse(initialArticle), // DTO
  isEditing: true,
  comments: [], // 评论列表
});

export default {

  namespace: 'article',

  state: JSON.parse(initialState),

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
    * getArticle({ payload }, { call, put }) {
      const res = yield call(getDetail, payload);
      const { success, msg, data } = res;
      if (success) {
        if (data.article) {
          yield put({ type: 'getArticleSuccess', payload: { data } });
        } else {
          yield put({ type: 'global/routeChange', payload: { path: '/error' } });
        }
      } else {
        message.error(msg);
      }
    },
    * saveArticle({ payload }, { select, call, put }) {
      let { article } = yield select(state => state.article);
      const { user } = yield select(state => state.user);
      if (!user.uid) {
        message.error('创建文章前请先登录');
        return;
      }
      const { content, status } = payload;
      article = {
        ...article,
        content,
        status,
        author: user.name,
      };
      const { success, msg } = yield call(saveArticle, article);
      if (success) {
        yield put({ type: 'saveSuccess' });
      } else {
        message.error(msg);
      }
      return { success, msg };
    },
    * removeArticle({ payload }, { call }) {
      const { success, msg } = yield call(removeArticle, payload);
      if (success) {
        message.success('删除成功');
      } else {
        message.error(msg);
      }
      return { success, msg };
    },
    * submitComment({ payload }, { select, call, put }) {
      const { article } = yield select(state => state.article);
      const { user } = yield select(state => state.user);
      if (user.uid) {
        payload = {
          ...payload,
          author: user.name,
          article_id: article.id,
        };
        const { success, msg, data: comment } = yield call(addComment, payload);
        if (success) {
          message.success('评论成功');
          yield put({ type: 'addCommentSuccess', payload: { comment } });
        } else {
          message.error(msg);
        }
      } else {
        message.error('评论前请先登录哦～');
      }
    },
    * delComment({ payload }, { select, call, put }) {
      const { user } = yield select(state => state.user);
      payload.operator = user.name;
      const { success, msg } = yield call(delComment, payload);
      if (success) {
        message.success('成功删除自己的一条评论');
        yield put({ type: 'delCommentSuccess', payload });
      } else {
        message.error(msg);
      }
      return { success, msg };
    },
    * submitReply({ payload }, { select, call, put }) {
      const { user } = yield select(state => state.user);
      if (user.uid) {
        const { name: author } = user;
        payload.author = author;
        const { success, msg, data: reply } = yield call(addReply, payload);
        if (success) {
          message.success('回复成功');
          yield put({ type: 'addReplySuccess', payload: { reply } });
        } else {
          message.error(msg);
        }
        return { success };
      }
      message.error('回复前请先登录哦～');
      return { success: false };
    },
    * delReply({ payload }, { select, call, put }) {
      const { user } = yield select(state => state.user);
      const operator = user.name;
      const { success, msg } = yield call(delReply, {
        id: payload.id,
        operator,
      });
      if (success) {
        message.success('删除回复成功');
        yield put({ type: 'delReplySuccess', payload });
      } else {
        message.error(msg);
      }
      return { success, msg };
    },
  },

  reducers: {
    init() {
      return JSON.parse(initialState);
    },
    stateChange(state, action) {
      const val = action.payload;
      return {
        ...state,
        ...val,
      };
    },
    articleChange(state, action) {
      let { article } = state;
      article = { ...article, ...action.payload };
      return {
        ...state,
        article,
      };
    },
    getListSuccess(state, action) {
      const { record: list, totalCount: total = 0 } = action.payload;
      return {
        ...state,
        list,
        total,
      };
    },
    getArticleSuccess(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
      };
    },
    saveSuccess(state) {
      const article = JSON.parse(initialArticle);
      return {
        ...state,
        isEditing: false,
        article,
      };
    },
    addCommentSuccess(state, action) {
      const { comment } = action.payload;
      const { comments = [] } = state;
      comments.unshift(comment);
      return {
        ...state,
        comments,
      };
    },
    delCommentSuccess(state, action) {
      let { comments = [] } = state;
      const { id } = action.payload;
      comments = comments.filter(item => item.id !== id);
      return {
        ...state,
        comments,
      };
    },
    addReplySuccess(state, action) {
      const { reply } = action.payload;
      const { comments } = state;
      comments.forEach((item) => {
        if (item.id === reply.comment_id) {
          item.replyList.unshift(reply);
        }
      });
      return {
        ...state,
        comments,
      };
    },
    delReplySuccess(state, action) {
      const { comments = [] } = state;
      const reply = action.payload;
      comments.forEach((item) => {
        if (item.id === reply.comment_id) {
          item.replyList = item.replyList.filter(replyItem => replyItem.id !== reply.id);
        }
      });
      return {
        ...state,
        comments,
      };
    },
  },
};
