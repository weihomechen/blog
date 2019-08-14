import { request } from '../utils';

export async function getList(params) {
  return request({
    url: '/blog/api/team/getList',
    method: 'GET',
    data: params,
  });
}

export async function create(params) {
  return request({
    url: '/blog/api/team/create',
    method: 'POST',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: '/blog/api/team/update',
    method: 'POST',
    data: params,
  });
}

export async function getDetail(params) {
  return request({
    url: '/blog/api/team/detail',
    method: 'GET',
    data: params,
  });
}
