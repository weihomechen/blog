import io from 'socket.io-client';
import { request } from '../utils';

let socket = null;
let ready = false;
const queue = [];

export default function () {
  if (socket) {
    return socket;
  }

  socket = {
    ready: (fn) => {
      if (ready) {
        fn();
      } else {
        queue.push(fn);
      }
    },
    io: io({
      path: '/blog/socket.io',
    }),
  };
  socket.io.on('disconnect', () => {
    ready = false;
    while (queue.length) queue.pop();
    socket = null;
  });
  socket.io.on('connect', () => {
    if (!socket) return;
    request({
      url: '/blog/api/user/connect',
      method: 'POST',
      data: {
        socketId: socket.io.id,
      },
    });
    ready = true;
    while (queue.length) {
      const fn = queue.pop();
      fn();
    }
  });
  socket.io.on('message', (data) => {

  });
  return socket;
}
