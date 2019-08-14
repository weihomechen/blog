import { request } from '../utils';

// 查询
export async function query(params) {
  return request({
    url: '/blog/api/article/list',
    method: 'GET',
    data: params,
  });
}

// 根据id获取详情
export async function getDetail(params) {
  return request({
    url: '/blog/api/article/detail',
    method: 'GET',
    data: params,
  });
}

export async function saveArticle(params) {
  return request({
    url: '/blog/api/article/save',
    method: 'POST',
    data: params,
  });
}

export async function removeArticle(params) {
  const selectedRowKeys = params.selectedRowKeys || [];
  const id = selectedRowKeys.join(',');

  return request({
    url: '/blog/api/article/remove',
    method: 'post',
    data: { id },
  });
}

export async function addComment(params) {
  return request({
    url: '/blog/api/comment/save',
    method: 'POST',
    data: params,
  });
}

export async function addReply(params) {
  return request({
    url: '/blog/api/reply/save',
    method: 'POST',
    data: params,
  });
}

export async function delComment(params) {
  return request({
    url: '/blog/api/comment/remove',
    method: 'POST',
    data: params,
  });
}

export async function delReply(params) {
  return request({
    url: '/blog/api/reply/remove',
    method: 'POST',
    data: params,
  });
}
