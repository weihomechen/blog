import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Input,
  Button,
  message,
} from 'antd';
import style from './assets/css/index.less';
import {
  User,
  DispatchParam,
} from '../../utils/type'

const initialState = JSON.stringify({
  uid: '',
  password: '',
  oldPassword: '',
});

export interface PersonCenterProps {
  user: User
  dispatch: (val: DispatchParam) => any
}

class PersonCenter extends Component<PersonCenterProps, {}> {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    dispatch: () => { },
  };

  static contextTypes = {
    router: PropTypes.object,
  }

  state = JSON.parse(initialState);

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  oldPasswordChange = (e) => {
    this.setState({ oldPassword: e.target.value });
  }

  submitChangePassword = () => {
    const { user, dispatch } = this.props;
    const { uid } = user;
    const { password, oldPassword } = this.state;

    if (!uid) {
      message.error('请先登录', 2, () => dispatch({
        type: 'global/routeChange',
        payload: { path: '/user/login?backUrl=/personCenter' },
      }));
    } else if (!password || !oldPassword) {
      message.error('请检查两次输入的密码，确定无误再提交');
    } else {
      dispatch({
        type: 'user/update',
        payload: { uid, password, oldPassword },
      });
    }
  }

  render() {
    const {
      oldPassword,
      password,
    } = this.state;

    return (
      <div className={style.personCenter}>
        <div id="updatePassword" className={style.updatePassword}>
          <div className={style.title}>修改密码</div>
          <Input className={style.password} type="password" placeholder="请输入旧密码" onChange={this.oldPasswordChange} value={oldPassword} />
          <Input className={style.password} type="password" placeholder="请输入新密码" onChange={this.passwordChange} value={password} />
          <Button type="primary" onClick={this.submitChangePassword}>确认修改</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    ...user,
  };
}

export default withRouter(connect(mapStateToProps)(PersonCenter));
