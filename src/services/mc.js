import { request } from '../utils';

export async function getList(params) {
  return request({
    url: '/blog/api/message/getList',
    method: 'GET',
    data: params,
  });
}

export async function getUnReadTotal() {
  return request({
    url: '/blog/api/message/getUnReadTotal',
    method: 'GET',
  });
}

export async function send(params) {
  return request({
    url: '/blog/api/message/create',
    method: 'post',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: '/blog/api/message/update',
    method: 'POST',
    data: params,
  });
}
