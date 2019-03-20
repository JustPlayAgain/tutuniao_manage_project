import {
  tutuniaoGuoMeiList,
  addtutuniaoGuoMei,
  updatetutuniaoGuoMei,
  importtutuniaoGuoMeiData,
} from '@/services/guomeiService';

export default {
  namespace: 'guoMei',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *queryguoMeiList({ payload }, { call, put }) {
      const response = yield call(tutuniaoGuoMeiList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addGuoMeiInfo({ payload }, { call, put }) {
      const response = yield call(addtutuniaoGuoMei, payload);
      yield put({
        type: 'add',
        payload: response,
      });
    },
    *updateGuoMeiInfo({ payload, callback }, { call, put }) {
      const response = yield call(updatetutuniaoGuoMei, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *importGuoMeiInfo({ payload, callback }, { call, put }) {
      const response = yield call(importtutuniaoGuoMeiData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
