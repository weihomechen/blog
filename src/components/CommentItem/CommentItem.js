/* eslint-disable no-unused-expressions,no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Button } from 'antd';
import { IconFont } from 'components';
import { customDebounce, showOffsetTime } from 'utils';
import style from './CommentItem.less';

const { TextArea } = Input;

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replysVisible: false,
      replyBoxVisible: false,
      replyContent: '',
      isShowDelBtn: '',
      showDelReplyBtnId: '',
    };
  }

  replyChangeDebounce = (replyContent) => {
    customDebounce(this.setState({ replyContent }), 100);
  }

  replyChange = (e) => {
    this.replyChangeDebounce(e.target.value);
  }

  toggleReplys = () => {
    const { replysVisible } = this.state;
    this.setState({ replysVisible: !replysVisible });
  }

  showTip = (replysLen) => {
    if (replysLen) {
      return `${replysLen}条回复`;
    }
    return '回复';
  };

  submitReply = () => {
    const {
      id: comment_id,
      author,
    } = this.props.comment;
    const { to, replyContent } = this.state;
    let content = replyContent;
    const reg = new RegExp(`回复 ${to}：`);
    content = replyContent.replace(reg, '');
    this.props.submitReply({ comment_id, to: to || author, content })
      .then(({ success }) => success && this.setState({ replyContent: '', to: '' }));
  }

  delCommentBtnChange = (isShowDelBtn) => {
    this.setState({ isShowDelBtn });
  }

  delReplyBtnChange = (showDelReplyBtnId) => {
    this.setState({ showDelReplyBtnId });
  }

  delComment = () => {
    const { comment, delComment } = this.props;
    const { id } = comment;
    delComment({ id });
  }

  presetReply = (item) => {
    const { author } = item;
    const { author: commentAuthor } = this.props.comment;
    author !== commentAuthor && this.setState({ to: author, replyContent: `回复 ${author}：` });
    this.replyInput.focus();
  }

  render() {
    const {
      comment,
      users,
      user,
    } = this.props;
    const {
      replysVisible,
      replyBoxVisible,
      replyContent,
      isShowDelBtn,
      showDelReplyBtnId,
    } = this.state;
    const { author, createTime, content, replyList = [] } = comment;
    const commentAuthor = users.find(item => item.name === author) || {};
    const replysLen = replyList.length;
    const isAuthor = author === user.name;
    let replyAuthorAvatar;
    const getReplyAuthor = (replyAuthorName) => {
      const replyAuthor = users.find(item => item.name === replyAuthorName) || {};
      replyAuthorAvatar = replyAuthor.avatar || '';
      return replyAuthorAvatar;
    };
    return (
      <div className={style.commentItem}>
        <div className={style.commentHeader}>
          {commentAuthor.avatar ? <img alt="" src={commentAuthor.avatar} className={style.avatar} /> : <IconFont type="avatar" color="#00ADB5" fontSize="28px" />}
          <span className={style.author}>{author}</span>
        </div>
        <div
          className={style.commentContent}
          onMouseEnter={this.delCommentBtnChange.bind(this, true)}
          onMouseLeave={this.delCommentBtnChange.bind(this, false)}
        >{content}
          <a
            className={style.delCommentBtn}
            style={{ display: (isAuthor && isShowDelBtn) || 'none' }}
            onClick={this.delComment}
          >删除
          </a>
        </div>
        <div className={style.commentFooter}>
          <Icon type="message" />
          <a className={style.replyBtn} onClick={this.toggleReplys}>
            {replysVisible ? '收起' : this.showTip(replysLen)}
          </a>
          <span className={style.commentTime}>{showOffsetTime(createTime)}</span>
        </div>
        <div className={style.replys} style={{ display: replysVisible || 'none' }}>
          {replyList.map(item => (<div key={item.id} className={style.replyItem}>
            <div className={style.replyHeader}>
              {getReplyAuthor(item.author) ? <img alt="" src={replyAuthorAvatar} className={style.avatar} /> : <IconFont type="avatar" fontSize="22px" />}
              <span className={style.replyAuthor}>{item.author}</span>
            </div>
            <div
              className={style.replyContent}
              onMouseEnter={this.delReplyBtnChange.bind(this, item.id)}
              onMouseLeave={this.delReplyBtnChange.bind(this, '')}
            >
              {item.to && item.to !== author && <span>回复<a className={style.replyTo}>{item.to}</a>：</span>}
              {item.content}
              <a
                className={style.delReplyBtn}
                style={{ display: (user.name === item.author && showDelReplyBtnId === item.id) || 'none' }}
                onClick={this.props.delReply.bind(this, item)}
              >删除</a>
              <a
                className={style.showReplyBtn}
                style={{ display: (user.name !== item.author && showDelReplyBtnId === item.id) || 'none' }}
                onClick={this.presetReply.bind(this, item)}
              >回复</a>
            </div>
            <div className={style.replyFooter}>{showOffsetTime(item.createTime)}</div>
          </div>))}
          <div className={style.replyBox} style={{ visibility: replyBoxVisible || 'none' }}>
            <TextArea
              ref={ref => this.replyInput = ref}
              value={replyContent}
              onChange={this.replyChange}
              autosize={{ minRows: 2, maxRows: 4 }}
              style={{ width: 500, marginRight: 16 }}
            />
            <Button type="primary" disabled={!replyContent.trim().length} onClick={this.submitReply}>回复</Button>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
  submitReply: PropTypes.func,
  delComment: PropTypes.func,
  delReply: PropTypes.func,
};

CommentItem.defaultProps = {
  comment: {},
  users: [],
  user: {},
  submitReply: () => { },
  delComment: () => { },
  delReply: () => { },
};

export default CommentItem;
