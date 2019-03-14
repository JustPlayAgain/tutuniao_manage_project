import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const httpTitle = getHttpTitle();

export async function tutuniaoActivityList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  const pageSize = 10;
  const pageIndex = 0;
  if (params != null) {
    const tmpParams = {
      ...params,
      pageSize: params.pageSize === undefined ? pageSize : params.pageSize,
      pageIndex: params.pageIndex === undefined ? pageIndex : params.pageIndex,
    };
    return request(`${httpTitle}/activity/queryActivityList?${stringify(tmpParams)}`, {
      method: 'GET',
    });
  }
  return request(
    `${httpTitle}/activity/queryActivityList?pageSize=${pageSize}&pageIndex=${pageIndex}`,
    { method: 'GET' }
  );
}

export async function tutuniaoAddActivity(params) {
  return request(`${httpTitle}/activity/insertActivity?${stringify(params)}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function tutuniaoUpdateActivity(params) {
  return request(`${httpTitle}/activity/updateActivity?${stringify(params)}`, {
    method: 'GET',
    credentials: 'include',
  });
}
