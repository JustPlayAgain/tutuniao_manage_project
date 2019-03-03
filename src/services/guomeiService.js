import { stringify } from 'qs';
import request from '@/utils/request';
import { getHttpTitle } from '@/utils/utils';

const httpTitle = getHttpTitle();

export async function tutuniaoGuoMeiList(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // currentPage=1&pageSize=20
  return request(`${httpTitle}/guomei/queryguomeitemplatelist`, {
    method: 'POST',
    body: { ...params },
  });
}

export async function addtutuniaoGuoMei(params) {
  return request(`${httpTitle}/guomei/insertguomeitemplate?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function updatetutuniaoGuoMei(params) {
  return request(`${httpTitle}/guomei/updateguomeitemplatebyid?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function deletetutuniaoGuoMei(params) {
  return request(`${httpTitle}/guomei/updateGuoMeiTemplateById?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function importtutuniaoGuoMeiData(params) {
  return request(`${httpTitle}/guomei/importguomeidata?${stringify(params)}`, {
    method: 'POST',
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
  });
}
