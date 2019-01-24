import {
  tutuniaoActivityList,
  tutuniaoAddActivity,
  tutuniaoUpdateActivity,
} from '@/services/tutuniao';

export default {
  namespace: 'activity',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *activityList({ payload }, { call, put }) {
      const response = yield call(tutuniaoActivityList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addActivity({ payload }, { call, put }) {
      const response = yield call(tutuniaoAddActivity, payload);
      yield put({
        type: 'add',
        payload: response,
      });
    },
    *updateActivity({ payload, callback }, { call, put }) {
      const response = yield call(tutuniaoUpdateActivity, payload);
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
