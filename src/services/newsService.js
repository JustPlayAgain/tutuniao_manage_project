import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const httpTitle = getHttpTitle();

export async function tutuniaoNewsList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  return request(`${httpTitle}/news/queryNewsList`, {
    method: 'POST',
    body: { ...params },
  });
}

export async function addtutuniaoNews(params) {
  return request(`${httpTitle}/news/insertNews?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function updatetutuniaoNews(params) {
  return request(`${httpTitle}/news/updateNews?${stringify(params)}`, {
    method: 'POST',
  });
}
