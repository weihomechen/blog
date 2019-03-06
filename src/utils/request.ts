import axios from 'axios';
// URLSearchParams polyfill 兼容旧的safari浏览器
import URLSearchParams from 'url-search-params';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetch = (options) => {
  const {
    method = 'get',
    data = {},
    url,
    ..._options
  } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data });
    case 'delete':
      return axios.delete(url, { data });
    case 'head':
      return axios.head(url, data);
    case 'post': {
      const params = new URLSearchParams();
      Object.keys(data).map((key) => {
        params.append(key, data[key]);
      });
      return axios.post(url, data, _options);
    }
    case 'put':
      return axios.put(url, data, _options);
    case 'patch':
      return axios.patch(url, data);
    case 'upload': {
      const form = new FormData();
      form.append('file', data.file);
      return axios.post(url, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    default:
      return axios(options);
  }
};

export const request = (options) => {
  const t = new Date().getTime();
  if (options.url.indexOf('?') !== -1) {
    const search = options.url.split('?')[0];
    if (search.length > 0) {
      options.url += `&t=${t}`;
    } else {
      options.url += `t=${t}`;
    }
  } else {
    options.url += `?t=${t}`;
  }

  return fetch(options).then(response => response.data).catch((error) => {
    // console.log(error);
    return Promise.reject(error);
  });
}
