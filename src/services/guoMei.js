import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const { httpTitle } = getHttpTitle();

export async function guoMeiActivityList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20

  if (params != null) {
    return request(
      `${httpTitle}/guomei/queryguomeitemplatelist?pageSize=${params.pageSize}&pageIndex=${
        params.currentPage
      }&${stringify(params)}`,
      { method: 'POST' }
    );
  }
  return request(`${httpTitle}/activity/queryActivityList`, { method: 'POST' });
}

export async function addGuoMei(params) {
  return request(`${httpTitle}/activity/insertActivity?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function updateGuoMei(params) {
  return request(`${httpTitle}/activity/updateActivity?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function importguomeidata(params) {
  return request(`${httpTitle}/activity/importguomeidata?${stringify(params)}`, {
    method: 'POST',
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
  });
}
