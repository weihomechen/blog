/* eslint-disable react/self-closing-comp */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Modal, Input, message } from 'antd';
import { Helmet } from 'react-helmet';
import { classnames, config } from '../utils';
import { Layout } from '../components';
import '../components/skin.less';

const localStorage = window.localStorage;
const {
  Header, Footer, Sider, styles,
} = Layout;

const App = ({
  children, location, dispatch, app,
}) => {
  const {
    isLogin,
    user,
    siderFold,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
  } = app;

  const headerProps = {
    user,
    isLogin,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    dispatch,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    logout() {
      localStorage.removeItem('UserName');
      localStorage.removeItem('UserUid');
      dispatch({ type: 'app/logout' });
    },
    changePassword() {
      dispatch({ type: 'app/showPasswordModal' });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const updatePassword = () => {
    const oldPassword = document.getElementById('old_password').value;
    const password = document.getElementById('new_password').value;
    dispatch({
      type: 'app/changePassword',
      payload: {
        uid: app.user.uid,
        oldPassword,
        password,
      },
    });
  };

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' });
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  return (
    <div>
      <Helmet>
        <title>Microants Blog</title>
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          <Sider {...siderProps} />
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          {/* <Bread location={location} /> */}
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Modal
        visible={app.passwordModalVisible}
        title="修改密码"
        onOk={updatePassword}
        onCancel={() => dispatch({ type: 'app/hidePasswordModal' })}
      >
        <Input type="password" id="old_password" placeholder="请输入旧密码" style={{ marginBottom: 16 }} />
        <Input type="password" id="new_password" placeholder="请输入新的密码" />
      </Modal>
    </div>
  );
};

App.propTypes = {
  loading: PropTypes.bool,
  location: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.func,
  children: PropTypes.element.isRequired,
};

App.defaultProps = {
  loading: false,
  location: {},
  app: { isLogin: false },
  dispatch: () => { },
};

function mapStateToProps({ app, loading }) {
  return {
    app,
    loading: loading.models.app,
  };
}

export default withRouter(connect(mapStateToProps)(App));

