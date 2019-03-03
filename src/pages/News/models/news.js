import { tutuniaoNewsList, addtutuniaoNews } from '@/services/newsService';

export default {
  namespace: 'news',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *queryNewsList({ payload }, { call, put }) {
      const response = yield call(tutuniaoNewsList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addNewsInfo({ payload }, { call, put }) {
      const response = yield call(addtutuniaoNews, payload);
      yield put({
        type: 'add',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      if (action.payload.status === 'ok') {
        return {
          ...state,
          data: { list: action.payload.data.t, pagination: { total: action.payload.data.total } },
        };
      }
      return {
        ...state,
        data: action.payload,
      };
    },
    add(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
