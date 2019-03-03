import {
  tutuniaoMatchList,
  addtutuniaoMatch,
  updatetutuniaoMatch,
  deletetutuniaoMatch,
} from '@/services/matchService';

export default {
  namespace: 'match',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *queryMatchList({ payload }, { call, put }) {
      const response = yield call(tutuniaoMatchList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addMatchInfo({ payload }, { call, put }) {
      const response = yield call(addtutuniaoMatch, payload);
      yield put({
        type: 'add',
        payload: response,
      });
    },
    *updateMatchInfo({ payload, callback }, { call, put }) {
      const response = yield call(updatetutuniaoMatch, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *deleteMatchInfo({ payload, callback }, { call, put }) {
      const response = yield call(deletetutuniaoMatch, payload);
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
