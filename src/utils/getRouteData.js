import routes from '../common/routes';

export default (app, layout) => routes(app).filter(route => route.layout === layout);
