/* eslint-disable no-unused-expressions,no-return-assign,no-restricted-globals,react/destructuring-assignment */
import { connect } from 'dva';
import { Row, Col, Input, Icon, Select, Tooltip, message } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import Editor from '../../components/Editor';

import styles from './assets/style/index.less';

const { Option } = Select;

@connect(({ feedback }) => {
  return {
    issue: feedback.issue,
  };
})
class FeedbackEdit extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      id: '',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.object,
    issue: PropTypes.object,
  }

  static defaultProps = {
    dispatch: () => { },
    match: {},
    issue: {},
  };

  componentWillMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;

    if (id) {
      this.setState({ id }, this.getIssueDetail);
    } else {
      dispatch({ type: 'feedback/initIssue' });
    }
  }

  getIssueDetail = () => {
    const { id } = this.state;
    this.props.dispatch({ type: 'feedback/getDetail', payload: { id } });
  }

  titleChange = (e) => {
    this.props.dispatch({ type: 'feedback/DTOChange', payload: { title: e.target.value } });
  }

  typeChange = (type) => {
    this.props.dispatch({ type: 'feedback/DTOChange', payload: { type } });
  }

  toIssueList = () => {
    this.props.dispatch({
      type: 'global/routeChange',
      payload: { path: '/feedback' },
    });
  }

  getContent = (content) => {
    const { dispatch } = this.props;

    const { title } = this.props.issue;

    if (!title || title.length > 50) {
      message.error('请输入50个字符内的标题');
      return;
    }

    dispatch({ type: 'feedback/saveIssue', payload: { content } }).then(({ success }) => {
      if (success) message.success('提交成功', 2, this.toIssueList);
    });
  }

  render() {
    const {
      issue,
    } = this.props;
    const {
      title,
      type,
      content,
    } = issue;
    const {
      id,
    } = this.state;

    const tipRender = () => (
      <ul
        className={styles.tips}
      >
        {/* <li>建议使用 <a target="_blank" rel="noopener noreferrer" href="http://www.markdown.cn/">Markdown</a></li> */}
        <li>Advice分类为功能和使用建议和意见，Bug分类为使用过程中遇到的问题反馈</li>
        <li>如果认为该issue已经没有讨论的意义，作者和系统管理员可对其进行关闭</li>
        <li>issue只能被关闭，对issue的回复可删除</li>
      </ul>
    );

    return (<div className={styles.feedbackEditPage}>
      <div className={styles.header}>
        <div className={styles.title}>
          {id ? 'Edit' : 'New'} issue
          <Tooltip title={tipRender} placement="right">
            <Icon
              type="question-circle"
            />
          </Tooltip>
        </div>
      </div>
      <Row gutter={16}>
        <Col span={19}>标题：<Input style={{ width: 900 }} value={title} onChange={this.titleChange} maxLength="60" /></Col>
        <Col span={4}>
          提交类型：<Select value={type} onChange={this.typeChange}>
            <Option value={0}>Advice</Option>
            <Option value={1}>Bug</Option>
          </Select>
        </Col>
      </Row>
      <div className={styles.editor}>
        <Editor
          getContent={this.getContent}
          content={content}
          type="issue"
        />
      </div>
    </div>);
  }
}

export default FeedbackEdit;
