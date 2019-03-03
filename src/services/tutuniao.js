import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const httpTitle = getHttpTitle();

export async function tutuniaoActivityList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  if (params != null) {
    return request(
      `${httpTitle}/activity/queryActivityList?pageSize=${params.pageSize}&pageIndex=${
        params.currentPage
      }&${stringify(params)}`,
      { method: 'GET' }
    );
  }
  return request(`${httpTitle}/activity/queryActivityList`, { method: 'GET' });
}

export async function tutuniaoAddActivity(params) {
  return request(`${httpTitle}/activity/insertActivity?${stringify(params)}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function tutuniaoUpdateActivity(params) {
  return request(`${httpTitle}/activity/updateActivity?${stringify(params)}`, {
    method: 'update',
    credentials: 'include',
  });
}
