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
  const apiUrl = `${process.env.NODE_ENV === 'development' ? '' : 'http://118.25.16.129'}${url}`
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(apiUrl, { params: data });
    case 'delete':
      return axios.delete(apiUrl, { data });
    case 'head':
      return axios.head(apiUrl, data);
    case 'post': {
      const params = new URLSearchParams();
      Object.keys(data).map((key) => {
        params.append(key, data[key]);
      });
      return axios.post(apiUrl, data, _options);
    }
    case 'put':
      return axios.put(apiUrl, data, _options);
    case 'patch':
      return axios.patch(apiUrl, data);
    case 'upload': {
      const form = new FormData();
      form.append('file', data.file);
      return axios.post(apiUrl, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    default:
      return axios(options);
  }
};

export default function request(options) {
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
    console.log(error);
    return Promise.reject(error);
  });
}
