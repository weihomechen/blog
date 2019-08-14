import { request } from '../utils';

export async function register(params) {
  return request({
    url: '/blog/api/user/register',
    method: 'POST',
    data: params,
  });
}

export async function login(params) {
  return request({
    url: '/blog/api/user/login',
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request({
    url: '/blog/api/user/logout',
    method: 'POST',
  });
}

export async function getUserInfo() {
  return request({
    url: '/blog/api/user/info',
    method: 'GET',
  });
}

export async function getUsers() {
  return request({
    url: '/blog/api/user/list',
    method: 'GET',
  });
}

export async function getActiveUsers() {
  return request({
    url: '/blog/api/user/active',
    method: 'GET',
  });
}

export async function join(params) {
  return request({
    url: '/blog/api/user/join',
    method: 'POST',
    data: params,
  });
}

export async function update(params) {
  return request({
    url: '/blog/api/user/update',
    method: 'PUT',
    data: params,
  });
}

export async function exitTeam(params) {
  return request({
    url: '/blog/api/user/exitTeam',
    method: 'PUT',
    data: params,
  });
}

export async function kicked(params) {
  return request({
    url: '/blog/api/user/kicked',
    method: 'POST',
    data: params,
  });
}

export async function invite(params) {
  return request({
    url: '/blog/api/user/invite',
    method: 'POST',
    data: params,
  });
}
