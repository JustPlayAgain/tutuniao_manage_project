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
  return request(`${httpTitle}/match/insertmatchtemplate?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function updatetutuniaoMatch(params) {
  return request(`${httpTitle}/match/updatematchtemplatebyid?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function deletetutuniaoMatch(params) {
  return request(`${httpTitle}/match/deletematchtemplatebyid?${stringify(params)}`, {
    method: 'POST',
  });
}
