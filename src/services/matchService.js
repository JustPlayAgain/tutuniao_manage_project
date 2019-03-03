import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const httpTitle = getHttpTitle();

export async function tutuniaoMatchList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  return request(`${httpTitle}/match/querymatchtemplatelist`, {
    method: 'POST',
    body: { ...params },
  });
}

export async function addtutuniaoMatch(params) {
  return request(`${httpTitle}/guomei/insertguomeitemplate?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function updatetutuniaoMatch(params) {
  return request(`${httpTitle}/guomei/updateguomeitemplatebyid?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function deletetutuniaoMatch(params) {
  return request(`${httpTitle}/guomei/updateGuoMeiTemplateById?${stringify(params)}`, {
    method: 'POST',
  });
}
