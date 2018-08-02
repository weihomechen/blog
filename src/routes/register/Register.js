/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Form, Input, message } from 'antd';
import { connect } from 'dva';
import styles from './assets/css/index.less';

const FormItem = Form.Item;

const Register = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
          message.error('请检查两次输入的密码是否一致');
          return;
        }
        dispatch({ type: 'user/register', payload: { ...values } });
      }
    });
  }
  function goToLogin() {
    dispatch({ type: 'global/routeChange', payload: { path: '/user/login' } });
  }
  return (
    <div className={styles.mark}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png" />
          <span>Microants Blog</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('nickname', {
              rules: [
                { required: true, message: '请填写花名' },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="花名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '请填写邮箱' },
              ],
            })(<Input size="large" type="email" onPressEnter={handleOk} placeholder="邮箱" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请创建密码' },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: '请确认密码' },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="确认密码" />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={loading}
            >注册账号
            </Button>
          </Row>
          <Row style={{ marginTop: 8 }}>
            <a className="login-tip" onClick={goToLogin}>已有账号？点这里登录</a>
          </Row>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  dispatch: PropTypes.func,
};

Register.defaultProps = {
  loading: false,
  form: {},
  dispatch: () => { },
};

function mapStateToProps({ app, loading }) {
  return {
    loading: loading.models.app,
    ...app,
  };
}

export default connect(mapStateToProps)(Form.create()(Register));
