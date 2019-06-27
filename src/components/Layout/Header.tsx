/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'dva';
import { Menu, Icon, Badge, notification, Button, Input } from 'antd';
import styles from './Header.less';
import io from '../../common/io';
import { User, DispatchParam } from '../../utils/type'

const { SubMenu } = Menu;

export interface HeaderProps {
  user: User
  location: any
  dispatch: (val: DispatchParam) => any
  showLogo: boolean
  isSiderFold: boolean
  siderFoldChange: any
  unReadTotal: number
}

class Header extends React.PureComponent<HeaderProps, {}> {
  state = {
    keyword: '',
  };

  socket: any

  static defaultProps = {
    user: {},
    location: {},
    dispatch: () => { },
    showLogo: true,
    isSiderFold: false,
    siderFoldChange: () => { },
    unReadTotal: 0,
  };

  static propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    showLogo: PropTypes.bool,
    isSiderFold: PropTypes.bool,
    siderFoldChange: PropTypes.func,
    unReadTotal: PropTypes.number,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/queryUser' });
    dispatch({ type: 'mc/getUnReadTotal' });

    this.socket = io();

    this.socket.ready(() => {
      this.socket.io.on('message', (message) => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="small" onClick={() => notification.close(key)}>
            知道了
          </Button>
        );
        notification.open({
          message,
          description: '请前往消息中心查看～',
          btn,
          key,
        });
        this.props.dispatch({ type: 'mc/getUnReadTotal' });
      });
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.io.disconnect();
    }
    this.socket = null;
  }

  goToLogin = () => {
    const {
      // pathname,
      search,
    } = window.location;
    const backUrl = encodeURIComponent(`${search}`);
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/user/login?backUrl=${backUrl}` } });
  }

  menuClick = (e) => {
    switch (e.key) {
      case 'login':
        this.goToLogin();
        break;
      case 'logout':
        this.logout();
        break;
      default:
        this.props.dispatch({ type: 'global/routeChange', payload: { path: `${e.key}` } });
    }
  }

  logout = () => {
    this.props.dispatch({ type: 'user/logout' });
  }

  keywordChange = (e) => {
    this.setState({ keyword: e.target.value });
  }

  submitSearch = () => {
    const { keyword } = this.state;
    this.setState({ keyword: '' }, () => {
      this.props.dispatch({ type: 'global/routeChange', payload: { path: `/search?keyword=${keyword}` } });
    });
  }

  render() {
    const {
      user,
      location,
      showLogo,
      isSiderFold,
      siderFoldChange,
      unReadTotal,
    } = this.props;
    const {
      uid,
      name,
      avatar,
      role,
      tid,
    } = user;
    const { keyword } = this.state;
    const currentPath = location.pathname;
    return (
      <div className={styles.header} style={{ zIndex: 1 }}>
        <div className={styles.headerContent}>
          <div className={styles.leftContent}>
            {showLogo ?
              <div className={styles.logoContainer}>
                <img className={styles.logo} alt="" src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png" />
                <a className={styles.logoText} href="#" data-letters="weihome">weihome</a>
              </div>
              : <Icon onClick={siderFoldChange} style={{ fontSize: 18, cursor: 'pointer' }} type={isSiderFold ? 'menu-unfold' : 'menu-fold'} />
            }
            {
              currentPath !== '/search' ?
                <Input
                  className={styles.searchInput}
                  value={keyword}
                  onChange={this.keywordChange}
                  onPressEnter={this.submitSearch}
                  placeholder="输入关键词加回车搜索"
                  prefix={<Icon type="search" />}
                /> : null
            }
          </div>
          <Menu selectedKeys={[currentPath]} mode="horizontal" onClick={this.menuClick}>
            <Menu.Item key="/">
              <span>首页</span>
            </Menu.Item>
            {tid && <Menu.Item key={`/team/${tid}/`}>
              <span>我的团队</span>
            </Menu.Item>}
            <Menu.Item key="/article/edit/">
              <span>写文章</span>
            </Menu.Item>
            <Menu.Item key="/mc/">
              <span><Badge count={unReadTotal}>消息</Badge></span>
            </Menu.Item>
            {uid ?
              <SubMenu
                title={<span className={styles.userContainer}>
                  {avatar ?
                    <img alt="" src={avatar} className={styles.userAvatar} /> :
                    <Icon type="user" />
                  }
                  {name}
                </span>}
              >
                <Menu.Item key="/personal/profile">
                  <span>个人中心</span>
                </Menu.Item>
                <Menu.Item key={`/personalPage/${uid}`}>
                  <span>我的主页</span>
                </Menu.Item>
                {+role === 1 && <Menu.Item key="/adminCenter/cateManage">
                  <span>管理员中心</span>
                </Menu.Item>}
                <Menu.Item key="logout">注销</Menu.Item>
              </SubMenu> :
              <Menu.Item key="login">
                <span className={styles.loginBtn}>登录</span>
              </Menu.Item>
            }
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect(({ user = {}, mc = {} }) => ({
  user: user.user,
  unReadTotal: mc.unReadTotal,
}))(Header);
