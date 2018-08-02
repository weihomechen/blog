/* eslint-disable react/self-closing-comp */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Switch, Route, withRouter } from 'dva/router';
import { Helmet } from 'react-helmet';
import { config } from '../utils';
import getRouteData from '../utils/getRouteData';
import { Layout } from '../components';
import '../components/skin.less';

const { Header, Footer, styles } = Layout;

class BasicLayout extends React.PureComponent {
  render() {
    const { location, dispatch, app } = this.props;
    const headerProps = {
      dispatch,
      location,
    };
    return (
      <div>
        <Helmet>
          <title>Microants Blog</title>
          <link rel="icon" href={config.logoSrc} type="image/x-icon" />
        </Helmet>
        <div className={styles.layout}>
          <Header {...headerProps} />
          <div className={styles.container}>
            <Switch>
              {
                getRouteData(app, 'basicLayout').map(item => (
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
          <Footer />
        </div>
      </div>
    );
  }
}

BasicLayout.propTypes = {
  app: PropTypes.object,
  loading: PropTypes.bool,
  location: PropTypes.object,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

BasicLayout.defaultProps = {
  app: {},
  loading: false,
  location: {},
  state: {},
  dispatch: () => { },
};

function mapStateToProps({ app, loading }) {
  return {
    state: app,
    loading: loading.models.app,
  };
}

export default withRouter(connect(mapStateToProps)(BasicLayout));

