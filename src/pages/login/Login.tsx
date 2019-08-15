import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;

export interface LoginProps {
  loading: boolean;
  dispatch: (val: any) => any;
  form: any;
}

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}: LoginProps) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }

      dispatch({ type: 'user/login', payload: { ...values } });
    });
  }
  function goToRegister() {
    dispatch({ type: 'global/routeChange', payload: { path: '/user/register' } });
  }
  return (
    <div className={styles.mark}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png" />
          <span>Rulifun Blog</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请填写邮箱或用户名' },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="邮箱或用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请填写密码' },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={loading}
            >登录
            </Button>
          </Row>
          <Row style={{ margin: '8px 0' }}>
            <a className="register-tip" onClick={goToRegister}>还没有账号？点这里注册</a>
          </Row>
          <div>试用账号：guest  密码：guest</div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  dispatch: PropTypes.func,
};

Login.defaultProps = {
  loading: false,
  form: {},
  dispatch: () => { },
};

function mapStateToProps({ app, loading }) {
  return {
    loading: loading.models.user,
    ...app,
  };
}

export default connect(mapStateToProps)(Form.create()(Login));
