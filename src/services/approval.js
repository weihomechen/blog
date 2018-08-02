import { request } from '../utils';

export async function getList(params) {
  return request({
    url: '/blog/api/approval/getList',
    method: 'GET',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: '/blog/api/approval/update',
    method: 'POST',
    data: params,
  });
}
