
import createLoading from 'dva-loading';

const loading = {
  global: false,
  models: {
    article: false,
    adminCenter: false,
    personCenter: false,
    team: false,
    category: false,
    approval: false,
  },
};

export const dva = {
  config: {
    ...createLoading(loading),
    onError(err) {
      err.preventDefault();
      // console.error(err.message);
    },
  },
};
