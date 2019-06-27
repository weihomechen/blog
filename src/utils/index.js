/* eslint-disable no-extend-native */
import { message } from 'antd';
import moment from 'moment';
export { request } from './request';

export const getQuery = (key) => {
  const query = {};
  location.search.slice(1).split('&').forEach((item) => { // eslint-disable-line
    const queryPair = item.split('=');
    query[queryPair[0]] = queryPair[1];
  });

  const rst = query[key];

  return rst ? decodeURIComponent(query[key]) : '';
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// 函数去抖（连续事件触发结束后只触发一次）
// sample 1: _.debounce(function(){}, 1000)
// 连续事件结束后的 1000ms 后触发
// sample 1: _.debounce(function(){}, 1000, true)
// 连续事件触发后立即触发（此时会忽略第二个参数）
export const customDebounce = (func, wait, immediate) => {
  let timeout;
  let args;
  let context;
  let timestamp;
  let result;

  const later = function () {
    // 定时器设置的回调 later 方法的触发时间，和连续事件触发的最后一次时间戳的间隔
    // 如果间隔为 wait（或者刚好大于 wait），则触发事件
    const last = Date.now - timestamp;

    // 时间间隔 last 在 [0, wait) 中
    // 还没到触发的点，则继续设置定时器
    // last 值应该不会小于 0 吧？
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      // 到了可以触发的时间点
      timeout = null;
      // 可以触发了
      // 并且不是设置为立即触发的
      // 因为如果是立即触发（callNow），也会进入这个回调中
      // 主要是为了将 timeout 值置为空，使之不影响下次连续事件的触发
      // 如果不是立即执行，随即执行 func 方法
      if (!immediate) {
        // 执行 func 函数
        result = func.apply(context, args);
        // 这里的 timeout 一定是 null 了吧
        // 感觉这个判断多余了
        if (!timeout) context = null; args = null;
      }
    }
  };

  // 嗯，闭包返回的函数，是可以传入参数的
  // 也是 DOM 事件所触发的回调函数
  return function (...val) {
    // 可以指定 this 指向
    context = this;
    args = val;

    // 每次触发函数，更新时间戳
    // later 方法中取 last 值时用到该变量
    // 判断距离上次触发事件是否已经过了 wait seconds 了
    // 即我们需要距离最后一次事件触发 wait seconds 后触发这个回调方法
    timestamp = Date.now();

    // 立即触发需要满足两个条件
    // immediate 参数为 true，并且 timeout 还没设置
    // immediate 参数为 true 是显而易见的
    // 如果去掉 !timeout 的条件，就会一直触发，而不是触发一次
    // 因为第一次触发后已经设置了 timeout，所以根据 timeout 是否为空可以判断是否是首次触发
    const callNow = immediate && !timeout;

    // 设置 wait seconds 后触发 later 方法
    // 无论是否 callNow（如果是 callNow，也进入 later 方法，去 later 方法中判断是否执行相应回调函数）
    // 在某一段的连续触发中，只会在第一次触发时进入这个 if 分支中
    if (!timeout) {
      // 设置了 timeout，所以以后不会进入这个 if 分支了
      timeout = setTimeout(later, wait);
    }
    // 如果是立即触发
    if (callNow) {
      // func 可能是有返回值的
      result = func.apply(context, args);
      // 解除引用
      context = null;
      args = null;
    }

    return result;
  };
};

export const showOffsetTime = (time) => {
  const momentTime = moment(time);
  const offset = Date.now() - momentTime.valueOf();
  if (offset < 0) {
    // 数据错误
    return '';
  }
  if (offset < 1000 * 60 * 60) {
    // 一小时内
    const showValue = Math.floor(offset / (1000 * 60)) || 1;
    return `${showValue}分钟前`;
  }
  if (offset < 1000 * 60 * 60 * 24) {
    // 一天内
    const showValue = Math.floor(offset / (1000 * 60 * 60));
    return `${showValue}小时前`;
  }
  const showValue = Math.floor(offset / (1000 * 60 * 60 * 24));
  return `${showValue}天前`;
};

export function checkFileSize(fileSize, maxSize = 2) {
  if (!fileSize) {
    console.error('请选择文件');
    return false;
  }

  const isOk = fileSize / 1024 / 1024 < maxSize;

  if (!isOk) {
    message.error(`请选择小于${maxSize}M的图片`);
    return isOk;
  }
}
