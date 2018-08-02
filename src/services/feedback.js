import { request } from '../utils';

// 查询
export async function query(params) {
  return request({
    url: '/blog/api/issue/list',
    method: 'GET',
    data: params,
  });
}

// 根据id获取详情
export async function getDetail(params) {
  return request({
    url: '/blog/api/issue/detail',
    method: 'GET',
    data: params,
  });
}

export async function saveIssue(params) {
  return request({
    url: '/blog/api/issue/save',
    method: 'POST',
    data: params,
  });
}

export async function closeIssue(params) {
  return request({
    url: '/blog/api/issue/save',
    method: 'post',
    data: params,
  });
}

export async function addReply(params) {
  return request({
    url: '/blog/api/issueReply/save',
    method: 'POST',
    data: params,
  });
}

export async function delReply(params) {
  return request({
    url: '/blog/api/issueReply/remove',
    method: 'POST',
    data: params,
  });
}
