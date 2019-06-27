/* eslint-disable react/self-closing-comp */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from '../components';
import '../components/skin.less';
import {
  DispatchParam,
} from '../utils/type'

const { Header, Footer, styles } = Layout;

export interface BasicLayoutProps {
  app: any,
  loading: boolean,
  location: any,
  state: any,
  dispatch: (val: DispatchParam) => any,
}

class BasicLayout extends React.PureComponent<BasicLayoutProps> {
  static propTypes = {
    app: PropTypes.object,
    loading: PropTypes.bool,
    location: PropTypes.object,
    state: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    app: {},
    loading: false,
    location: {},
    state: {},
    dispatch: () => { },
  };

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

function mapStateToProps({ app, loading }) {
  return {
    state: app,
    loading: loading.models.app,
  };
}

export default withRouter(connect(mapStateToProps)(BasicLayout));

