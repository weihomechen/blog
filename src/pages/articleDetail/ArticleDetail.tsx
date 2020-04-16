import { connect } from 'dva';
import { IconFont } from 'components';
import { Spin, Input, Button } from 'antd';
import { EditorState } from 'braft-editor';
import CommentItem from 'components/commentItem';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styles from './assets/css/index.less';
import {
  Article,
  Comment,
  User,
} from '../../utils/type';

const { TextArea } = Input;

export interface ArticleDetailProps {
  loading: boolean;
  comments: Comment[];
  article: Article;
  dispatch: (val: any) => any;
  user: User;
  users: User[];
  match: any;
}

export interface ArticleDetailState {
  comment: string;
  moneyCodeVisiable: boolean;
}

class ArticleDetail extends Component<ArticleDetailProps, ArticleDetailState> {
  static propTypes = {
    loading: PropTypes.bool,
    comments: PropTypes.array,
    article: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array,
    match: PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    comments: [],
    article: {},
    dispatch: () => { },
    user: {},
    users: [],
    match: {},
  };

  state = {
    comment: '',
    moneyCodeVisiable: false,
  };

  componentDidMount() {
    const {
      match,
    } = this.props;

    const { id } = match.params;
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
    this.props.dispatch({
      type: 'article/submitComment',
      payload: { content },
    }).then(() => this.setState({ comment: '' }));
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
    const { loading, article, comments, user = {} as User, users } = this.props;
    const { title = '', author, updateTime, content, isAcceptReward } = article;
    const { moneyCode } = user;
    const { comment, moneyCodeVisiable } = this.state;
    const showTime = moment(updateTime).format('YYYY-MM-DD HH:mm:ss');

    const avatarRender = () => {
      const avatar = this.getUserInfo(author, 'name', 'avatar');
      return avatar ?
        <img className={styles.avatar} src={avatar} alt="" />
        : <IconFont className={styles.avatar} type="avatar" fontSize="60px" color="#00ADB5" />;
    };

    const editorState = EditorState.createFrom(content);
    const contentHtml = editorState.toHTML();

    return (
      <div className={styles.articleDetail}>
        <Helmet>
          <link href="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/prism.css" rel="stylesheet" />
          <script src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/prism.js" defer />
        </Helmet>
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
        <div className={styles.contentContainer} dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
                style={{ display: moneyCodeVisiable ? '' : 'none' }}
              />
            </div> : null
        }
        <div className={styles.comments}>
          <div className={styles.commentsHeader}>{`评论( ${comments.length || 0} )`}</div>
          <div className={styles.commentBox}>
            {user.avatar
              ? <img className={styles.avatar} src={user.avatar} alt="" />
              : <IconFont type="avatar" fontSize="32px" />}
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

function mapStateToProps({ loading, user, article }) {
  return {
    loading: loading.models.article,
    ...article,
    ...user,
  };
}

export default connect(mapStateToProps)(ArticleDetail);
