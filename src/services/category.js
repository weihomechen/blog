import { request } from '../utils';

export async function getCateList() {
  return request({
    url: '/blog/api/cate/list',
    method: 'GET',
  });
}

export async function saveCate(params) {
  return request({
    url: '/blog/api/cate/save',
    method: 'POST',
    data: params,
  });
}

export async function delCate(params) {
  return request({
    url: '/blog/api/cate/remove',
    method: 'POST',
    data: params,
  });
}
