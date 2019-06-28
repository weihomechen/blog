import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Input, Button, message } from 'antd';
import * as styles from './assets/style/index.less';
import {
  User,
  Dispatch,
} from '../../utils/type'

const { TextArea } = Input;

export interface MessageSenderProps {
  user: User
  users: User[]
  dispatch: Dispatch
}

export interface MessageSenderState {
  title: string
  content: string
  receiver: number[]
}

@connect(({ user, team, messageSender }) => {
  return {
    ...user,
    ...team,
    ...messageSender,
  };
})
class MessageSender extends Component<MessageSenderProps, MessageSenderState> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      receiver: [], // 发送站内信是只有系统管理员可以发么，团队管理员或者普通用户是否也能发消息给某一个或者某一些用户？
    };
  }

  static propTypes = {
    user: PropTypes.object,
    users: PropTypes.array,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    users: [],
    dispatch: () => { },
  };

  contentChange = (e) => {
    this.setState({ content: e.target.value });
  }
  titleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  submitSend = () => {
    const { dispatch } = this.props;
    const { title, content } = this.state;
    if (!title || !content) {
      message.error('请输入消息标题和内容');
    }

    dispatch({ type: 'messageSender/submitSend', payload: { title, content } })
      .then((success, msg) => {
        if (success) {
          message.success('发送成功', 2, () => {
            this.setState({ title: '', content: '' });
            dispatch({ type: 'mc/getUnReadTotal' });
          });
        } else {
          message.error(msg);
        }
      });
  }

  render() {
    const { title, content } = this.state;
    return (
      <div className={styles.messageSenderPage}>
        <div className={styles.title}>发送站内信</div>
        <Row gutter={16}>
          <Col span={2}>
            消息标题
          </Col>
          <Col span={18}>
            <Input value={title} onChange={this.titleChange} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={2}>
            消息内容
          </Col>
          <Col span={18}>
            <TextArea
              className={styles.content}
              value={content}
              autosize={{ minRows: 4 }}
              onChange={this.contentChange}
            />
          </Col>
        </Row>
        <Button type="primary" onClick={this.submitSend}>发送</Button>
      </div>
    );
  }
}

export default MessageSender;
