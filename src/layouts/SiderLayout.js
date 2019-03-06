/* eslint-disable react/self-closing-comp */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import config from 'config/page.config';
import { Layout } from '../components';
import '../components/skin.less';

const {
  Header, Footer, Sider, styles,
} = Layout;

class SiderLayout extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isSiderFold: false,
    };
  }

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

SiderLayout.propTypes = {
  app: PropTypes.object,
  loading: PropTypes.bool,
  location: PropTypes.object,
  state: PropTypes.object,
  dispatch: PropTypes.func,
  unHandledCount: PropTypes.number,
};

SiderLayout.defaultProps = {
  app: {},
  loading: false,
  location: {},
  state: {},
  dispatch: () => { },
  unHandledCount: 0,
};

function mapStateToProps({ global, approval = {}, loading }) {
  return {
    state: global,
    loading: loading.models.app,
    unHandledCount: approval.unHandledCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderLayout));

