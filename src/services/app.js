import { request } from '../utils';

export async function updatePassword(params) {
  return request({
    url: '/blog/api/user/update',
    method: 'put',
    data: params,
  });
}
