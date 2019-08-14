import { message } from 'antd';
import { getCateList, saveCate, delCate } from '../services/category';

const initialState = JSON.stringify({
  cate: {},
  cateList: [],
  cateModalVisible: false,
});

export default {

  namespace: 'category',

  state: JSON.parse(initialState),

  effects: {
    * getCateList({ payload }, { call, put }) {
      const { success, msg, data } = yield call(getCateList);
      const { record: cateList } = data;
      if (success) {
        yield put({ type: 'getCateListSuccess', payload: { cateList } });
      } else {
        message.error(msg);
      }
      return { success, cateList };
    },
    * saveCate({ payload }, { call, put }) {
      const { success, msg } = yield call(saveCate, payload.cate);
      if (success) {
        message.success('操作成功');
        yield put({ type: 'stateChange', payload: { cate: {}, cateModalVisible: false } });
        yield put({ type: 'getCateList' });
      } else {
        message.error(msg);
      }
    },
    * delCate({ payload }, { call, put }) {
      const { success, msg } = yield call(delCate, payload);
      if (success) {
        message.success('删除分类成功');
        yield put({ type: 'getCateList' });
      } else {
        message.error(msg);
      }
    },
  },

  reducers: {
    stateChange(state, action) {
      const val = action.payload;
      return {
        ...state,
        ...val,
      };
    },
    cateDTOChange(state, action) {
      let { cate } = state;
      const val = action.payload;
      cate = { ...cate, ...val };
      return {
        ...state,
        cate,
      };
    },
    getCateListSuccess(state, action) {
      const { cateList } = action.payload;
      return {
        ...state,
        cateList,
      };
    },
    editCate(state, action) {
      const { cate } = action.payload;
      return {
        ...state,
        cate,
        cateModalVisible: true,
      };
    },
    addCate(state) {
      return {
        ...state,
        cate: {},
        cateModalVisible: true,
      };
    },
  },
};
