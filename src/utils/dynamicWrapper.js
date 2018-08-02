
import dynamic from 'dva/dynamic';

export default (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});
