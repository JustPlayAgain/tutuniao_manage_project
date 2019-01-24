import { stringify } from 'qs';
import request from '@/utils/request';

const httpTitle = {
  tutuniao: 'http://www.tutuniao.com:8008/tutuniao',
};

export async function tutuniaoActivityList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  if (params != null) {
    return request(
      `${httpTitle.tutuniao}/activity/queryActivityList?pageSize=${params.pageSize}&pageIndex=${
        params.currentPage
      }&${stringify(params)}`,
      { method: 'GET' }
    );
  }
  return request(`${httpTitle.tutuniao}/activity/queryActivityList`, { method: 'GET' });
}

export async function tutuniaoAddActivity(params) {
  return request(`${httpTitle.tutuniao}/activity/insertActivity?${stringify(params)}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function tutuniaoUpdateActivity(params) {
  return request(`${httpTitle.tutuniao}/activity/updateActivity?${stringify(params)}`, {
    method: 'update',
    credentials: 'include',
  });
}
