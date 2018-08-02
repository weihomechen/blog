/* eslint-disable no-unused-expressions,no-return-assign,no-nested-ternary,no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message, Tag, Popconfirm, Input } from 'antd';
import Button from 'material-ui/Button';
import moment from 'moment';
import { IconFont } from 'components';
import BraftEditor from 'braft-editor';
import style from './assets/style/index.less';

const { TextArea } = Input;
const typeMap = {
  0: {
    name: 'advice',
    color: '#00adb5',
  },
  1: {
    name: 'bug',
    color: '#dc6673',
  },
};
const statusMap = {
  0: {
    name: 'forbid',
    color: '#dc6673',
  },
  1: {
    name: 'time1',
    color: '#00adb5',
  },
};

@connect(({ user, feedback }) => {
  return {
    user: user.user,
    users: user.users,
    issue: feedback.issue,
  };
})
class FeedbackDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      replyContent: '',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.object,
    user: PropTypes.object,
    users: PropTypes.array,
    issue: PropTypes.object,
  }

  static defaultProps = {
    dispatch: () => { },
    match: {},
    user: {},
    users: [],
    issue: {},
  };

  componentWillMount() {
    const {
      match,
      dispatch,
    } = this.props;
    const { id } = match.params;

    if (id) {
      this.getDetail(id);
    } else {
      dispatch({ type: 'global/routeChange', payload: { path: '/error' } });
    }
    this.editorInstance && this.editorInstance.setEditorProp('readOnly', true);
  }

  getDetail = () => {
    const { dispatch, issue } = this.props;
    const { id } = issue;

    dispatch({ type: 'feedback/getDetail', payload: { id } });
  }

  backToList = () => {
    this.props.dispatch({
      type: 'global/routeChange',
      payload: { path: '/feedback' },
    });
  }

  getUserInfo = (uid, info) => {
    const { users } = this.props;
    const target = users.find(v => v.uid === uid) || {};
    return target[info] || '';
  }

  replyContentChange = (e) => {
    this.setState({ replyContent: e.target.value });
  }

  submitReply = () => {
    const { replyContent } = this.state;

    if (!replyContent) {
      message.error('请填写回复内容');
      return;
    }

    this.props.dispatch({ type: 'feedback/submitReply', payload: { content: replyContent } }).then(({ success }) => {
      if (success) {
        message.success('回复成功', 1, this.getDetail);
        this.setState({ replyContent: '' });
      }
    });
  }

  delReply = (id) => {
    this.props.dispatch({ type: 'feedback/delReply', payload: { id, status: 0 } }).then(({ success }) => {
      if (success) {
        message.success('删除回复成功', 1, this.getDetail);
      }
    });
  }

  closeIssue = () => {
    const { id } = this.props.issue;
    this.props.dispatch({ type: 'feedback/closeIssue', payload: { id, status: 0 } }).then(({ success, msg }) => {
      if (success) {
        message.success('关闭成功', 1.5, this.getDetail);
      } else {
        message.error(msg || '关闭失败');
      }
    });
  }

  render() {
    const {
      user,
      issue,
    } = this.props;
    const {
      title,
      author,
      updateTime,
      type,
      replys = [],
      status,
      content,
    } = issue;
    const { replyContent } = this.state;
    const avatarRender = (uid) => {
      const avatar = this.getUserInfo(uid, 'avatar');
      return avatar ? <img alt="" className={style.avatar} width="60px" height="60px" src={avatar} />
        : <IconFont className={style.avatar} type="avatar" fontSize="60px" color="#00ADB5" />;
    };
    const showTime = (time = updateTime) => moment(time).format('YYYY-MM-DD HH:mm:ss');
    const typeInfo = typeMap[String(type)] || {};
    const statusInfo = statusMap[String(status)] || {};
    const editorProps = {
      height: 'auto',
      initialContent: JSON.parse(content),
      controls: [],
    };

    return (
      <div className={style.feedbackDetailPage}>
        <div className={style.detailHeader}>
          <div className={style.titleContainer}>
            <div className={style.title}>{title}</div>
            <Tag color={typeInfo.color}>{typeInfo.name}</Tag>
            <div><IconFont color={statusInfo.color} type={statusInfo.name} fontSize="24px" /></div>
          </div>
          <div className={style.info}>
            {avatarRender(author)}
            <div className={style.infos}>
              <div className={style.author}>{this.getUserInfo(author, 'name')}</div>
              <div className={style.infoItems}>{showTime()}</div>
            </div>
          </div>
        </div>
        <div className={style.contentContainer}>
          <BraftEditor
            ref={instance => this.editorInstance = instance}
            {...editorProps}
          />
        </div>
        <div className={style.actionsContainer}>
          {user.uid === author || user.role === 1 ?
            issue.status === 1 ? <Popconfirm title="是否确定该反馈已经没有讨论的必要并将其关闭?" onConfirm={this.closeIssue} >
              <Button className={style.closeIssue}><IconFont type="forbid" fontSize="16px" />关闭</Button></Popconfirm> : null
            : null
          }
        </div>
        <div className={style.replys}>
          {replys.map(reply => {
            const { id, author: replyAuthor, createTime } = reply;
            return (<div key={id} className={style.replyItem}>
              {avatarRender(replyAuthor)}
              <div className={style.replyContainer}>
                <div className={style.replyHeader}>
                  <span><IconFont type="time" />{showTime(createTime)}</span>
                  <span>
                    {user.uid === replyAuthor ? <a onClick={this.delReply.bind(this, id)}>删除</a> : null}
                  </span>
                </div>
                <div className={style.replyBody}>
                  {reply.content}
                </div>
              </div>
            </div>);
          })}
        </div>
        {
          status ? <div>
            <div className={style.sectionTitle}>回复</div>
            <div className={style.replyEditorContainer}>
              {avatarRender(user.uid)}
              <div className={style.editorContainer}>
                <TextArea
                  autosize={{ minRows: 2, maxRows: 4 }}
                  value={replyContent}
                  onChange={this.replyContentChange}
                />
              </div>
            </div>
            <div className={style.footer}>
              <Button className={style.submitBtn} onClick={this.submitReply} disabled={!status}>提交回复</Button>
              <Button className={style.goBackBtn} onClick={this.backToList}>返回列表</Button>
            </div>
          </div> : (<div className={style.cloesedTip}>
            <div>
              <IconFont type="forbid" fontSize="18px" />
              该反馈已被关闭，已经没有讨论的必要
            </div>
            <Button className={style.goBackBtn} onClick={this.backToList}>返回列表</Button>
          </div>)
        }
      </div>
    );
  }
}

export default FeedbackDetail;
