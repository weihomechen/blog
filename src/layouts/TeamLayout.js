/* eslint-disable react/self-closing-comp */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from '../components';
import '../components/skin.less';

const { Header, Footer, styles } = Layout;

class TeamLayout extends React.PureComponent {
  render() {
    const { location, dispatch, children } = this.props;
    const headerProps = {
      dispatch,
      location,
    };
    return (
      <div className={styles.layout}>
        <Header {...headerProps} />
        <div className={styles.container}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

TeamLayout.propTypes = {
  app: PropTypes.object,
  loading: PropTypes.bool,
  location: PropTypes.object,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

TeamLayout.defaultProps = {
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

export default withRouter(connect(mapStateToProps)(TeamLayout));

