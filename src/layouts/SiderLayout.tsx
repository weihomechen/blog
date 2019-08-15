import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout } from '../components';
import '../components/skin.less';
import {
  DispatchParam,
} from '../utils/type';

const {
  Header, Footer, Sider, styles,
} = Layout;

export interface SiderLayoutProps {
  app: any;
  loading: boolean;
  location: any;
  state: any;
  dispatch: (val: DispatchParam) => any;
  unHandledCount: number;
}

class SiderLayout extends React.PureComponent<SiderLayoutProps, {}> {

  static propTypes = {
    app: PropTypes.object,
    loading: PropTypes.bool,
    location: PropTypes.object,
    state: PropTypes.object,
    dispatch: PropTypes.func,
    unHandledCount: PropTypes.number,
  };

  static defaultProps = {
    app: {},
    loading: false,
    location: {},
    state: {},
    dispatch: () => { },
    unHandledCount: 0,
  };
  state = {
    isSiderFold: false,
  };

  render() {
    const {
      location,
      dispatch,
      unHandledCount,
      children,
    } = this.props;
    const { isSiderFold } = this.state;
    const siderFoldChange = () => {
      this.setState({
        isSiderFold: !this.state.isSiderFold,
      });
    };
    const headerProps = {
      dispatch,
      location,
      isSiderFold,
      showLogo: false,
      siderFoldChange,
      unHandledCount,
    };
    const siderPros = {
      location,
      dispatch,
      isSiderFold,
      unHandledCount,
    };

    return (
      <div className={`${styles.layout} ${isSiderFold ? styles.fold : ''}`}>
        <aside className={styles.sider}>
          <Sider {...siderPros} />
        </aside>
        <div className={styles.main}>
          <Header {...headerProps} />
          <div className={styles.container}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ global, approval = {}, loading }) {
  return {
    state: global,
    loading: loading.models.app,
    unHandledCount: (approval as any).unHandledCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderLayout));
