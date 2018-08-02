import React from 'react';
import { Switch, Route } from 'dva/router';

import getRouteData from '../utils/getRouteData';

export default (props) => {
  const {
    app,
  } = props;

  return (
    <div>
      <Switch>
        {
          getRouteData(app, 'userLayout').map(item => (
            <Route
              exact={item.exact}
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))
        }
      </Switch>
    </div>
  );
};
