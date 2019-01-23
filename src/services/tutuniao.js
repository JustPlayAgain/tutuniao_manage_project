import { stringify } from 'qs';
import request from '@/utils/request';

const httpTitle = {
  tutuniao: 'http://localhost:8888/tutuniao',
};

export async function tutuniaoActivityList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  if (params != null) {
    return request(
      `${httpTitle.tutuniao}/activity/queryActivityList?pageSize=${params.pageSize}&pageIndex=${
        params.currentPage
      }&${stringify(params)}`
    );
  }
  return request(`${httpTitle.tutuniao}/activity/queryActivityList`);
}

export async function tutuniaoAddActivity(params) {
  return request(`${httpTitle.tutuniao}/activity/insertActivity?${stringify(params)}`);
}
