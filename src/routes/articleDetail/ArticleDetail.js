/* eslint-disable no-unused-expressions,no-return-assign */
import { connect } from 'dva';
import { IconFont } from 'components';
import { Spin, Input, Button } from 'antd';
import BraftEditor from 'braft-editor';
import CommentItem from 'components/CommentItem';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './assets/css/index.less';

const { TextArea } = Input;

class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      moneyCodeVisiable: false,
    };
  }

  componentDidMount() {
    const {
      match,
    } = this.props;

    const { id } = match.params;

    this.editorInstance && this.editorInstance.setEditorProp('readOnly', true);
    this.getArticle(id);
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'article/init' });
  }

  getArticle = (id) => {
    this.props.dispatch({ type: 'article/getArticle', payload: { id } });
  }

  commentChange = (e) => {
    this.setState({ comment: e.target.value });
  }

  submitComment = () => {
    const { comment: content } = this.state;
    this.props.dispatch({ type: 'article/submitComment', payload: { content } }).then(() => this.setState({ comment: '' }));
  }

  submitReply = (payload) => this.props.dispatch({ type: 'article/submitReply', payload });

  delComment = (payload) => {
    this.props.dispatch({ type: 'article/delComment', payload });
  }

  delReply = (payload) => {
    this.props.dispatch({ type: 'article/delReply', payload });
  }

  getUserInfo = (value, field, returnField) => {
    const { users } = this.props;
    const targetUser = users.find(item => item[field] === value) || {};
    return targetUser[returnField] || '';
  }

  moneyCodeVisiableChange = (moneyCodeVisiable) => {
    this.setState({ moneyCodeVisiable });
  }

  render() {
    const { loading, article, comments, user = {}, users } = this.props;
    const { title = '', author, updateTime, content, isAcceptReward } = article;
    const { moneyCode } = user;
    const { comment, moneyCodeVisiable } = this.state;
    const showTime = moment(updateTime).format('YYYY-MM-DD HH:mm:ss');

    const editorProps = {
      height: 'auto',
      initialContent: JSON.parse(content),
      controls: [],
    };

    const avatarRender = () => {
      const avatar = this.getUserInfo(author, 'name', 'avatar');
      return avatar ?
        <img className={styles.avatar} src={avatar} alt="" />
        : <IconFont className={styles.avatar} type="avatar" fontSize="60px" color="#00ADB5" />;
    };

    return (
      <div className={styles.articleDetail}>
        <Spin size="large" spinning={loading} />
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.info}>
          {avatarRender()}
          <div className={styles.infos}>
            <div className={styles.author}>{author}</div>
            <div className={styles.infoItems}>{showTime}</div>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <BraftEditor
            ref={instance => this.editorInstance = instance}
            {...editorProps}
          />
        </div>
        {
          isAcceptReward && moneyCode ?
            <div className={styles.rewardContainer}>
              <div
                className={styles.reward}
                onMouseEnter={this.moneyCodeVisiableChange.bind(this, true)}
                onMouseLeave={this.moneyCodeVisiableChange.bind(this, false)}
              >
                <div className={styles.tip}>原创不易，请Ta喝杯咖啡</div>
                <IconFont type="shang" fontSize="64px" />
              </div>
              <img
                className={styles.moneyCode}
                alt=""
                src={moneyCode}
                style={{ display: moneyCodeVisiable || 'none' }}
              />
            </div> : null
        }
        <div className={styles.comments}>
          <div className={styles.commentsHeader}>{`评论( ${comments.length || 0} )`}</div>
          <div className={styles.commentBox}>
            {user.avatar ? <img className={styles.avatar} src={user.avatar} alt="" /> : <IconFont type="avatar" fontSize="32px" />}
            <TextArea
              placeholder="说说你的看法"
              value={comment}
              onChange={this.commentChange}
              autosize={{ minRows: 2, maxRows: 4 }}
              style={{ width: 500, margin: '0 24px' }}
            />
            <Button disabled={!comment.trim().length} type="primary" onClick={this.submitComment}>评论</Button>
          </div>
          {comments.map(item => (<CommentItem
            key={item.id}
            comment={item}
            submitReply={this.submitReply}
            delComment={this.delComment}
            delReply={this.delReply}
            users={users}
            user={user}
          />))}
        </div>
      </div>
    );
  }
}

ArticleDetail.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,
  article: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
  user: PropTypes.object,
  users: PropTypes.array,
  match: PropTypes.object,
};

ArticleDetail.defaultProps = {
  loading: false,
  comments: [],
  article: {},
  dispatch: () => { },
  user: {},
  users: [],
  match: {},
};

function mapStateToProps({ loading, user, article }) {
  return {
    loading: loading.models.article,
    ...article,
    ...user,
  };
}

export default connect(mapStateToProps)(ArticleDetail);
