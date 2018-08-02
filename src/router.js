/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, routerRedux } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import dynamicWrapper from './utils/dynamicWrapper';

const { ConnectedRouter } = routerRedux;

function getLayout(app, models, layout) {
  return dynamicWrapper(app, models, () => import(`./layout/${layout}`));
}

const Routers = function ({ history, app }) {
  const passProps = {
    app,
  };
  const UserLayout = getLayout(app, ['user', 'mc'], 'UserLayout');
  const BasicLayout = getLayout(app, ['user', 'mc'], 'BasicLayout');
  const TeamLayout = getLayout(app, ['user', 'mc'], 'TeamLayout');
  const SiderLayout = getLayout(app, ['user', 'mc', 'approval'], 'SiderLayout');

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
          <Route path="/team" render={props => <TeamLayout {...props} {...passProps} />} />
          <Route path="/personal" render={props => <SiderLayout {...props} {...passProps} />} />
          <Route path="/adminCenter" render={props => <SiderLayout {...props} {...passProps} />} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </LocaleProvider>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

Routers.defaultProps = {
  history: {},
  app: {},
};

export default Routers;
