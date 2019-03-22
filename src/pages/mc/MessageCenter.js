/* eslint-disable no-confusing-arrow,no-unused-expressions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs, Pagination, message, Badge } from 'antd';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { IconFont } from 'components';
import config from 'config/project.config';
import style from './assets/css/index.less';

const { TabPane } = Tabs;
let timer;

class MessageCenter extends PureComponent {
  constructor() {
    super();
    this.state = {
      alreadyReadList: [],
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    discussMsgList: PropTypes.array,
    systemMsgList: PropTypes.array,
    discussMsgTotal: PropTypes.number,
    systemMsgTotal: PropTypes.number,
    unReadSysMsgTotal: PropTypes.number,
    unReadDisMsgTotal: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => { },
    discussMsgList: [],
    systemMsgList: [],
    discussMsgTotal: 0,
    systemMsgTotal: 0,
    unReadSysMsgTotal: 0,
    unReadDisMsgTotal: 0,
  };

  componentDidMount() {
    this.getDiscussMsgs().then(() => setTimeout(() => this.lazyHandler(), 1000));
    this.getSystemMsgs();

    window.addEventListener('scroll', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.lazyHandler(), 200);
    }, true);
  }

  lazyHandler = (className = 'message-item') => {
    const { alreadyReadList } = this.state;
    const visibleHeight = document.documentElement.clientHeight; // 获取可视区域高度
    const msgList = Array.from(document.getElementsByClassName(className));

    msgList.forEach((item) => {
      const offsetTop = item.getBoundingClientRect().bottom;
      const mid = item.id;
      if (offsetTop < visibleHeight && !alreadyReadList.find(v => v === +mid)) {
        this.changeMsgStatus(mid);
      }
    });
  }

  changeMsgStatus = (mid) => {
    const { dispatch } = this.props;
    const { alreadyReadList } = this.state;

    dispatch({
      type: 'mc/changeStatus',
      payload: { mid, status: 1 },
    }).then((success, msg) => {
      if (success) {
        alreadyReadList.push(mid);
        this.setState({ alreadyReadList });
        dispatch({ type: 'mc/getUnReadTotal' });
      } else {
        message.error(msg);
      }
    });
  }

  getSystemMsgs = (pageNo = 1) => {
    return this.props.dispatch({
      type: 'mc/getList',
      payload: { type: 1, pageNo },
    }).then(({ success }) => success && this.handleAlreadyRead(this.props.systemMsgList));
  }

  getDiscussMsgs = (pageNo = 1) => {
    return this.props.dispatch({
      type: 'mc/getList',
      payload: { type: 2, pageNo },
    }).then(({ success }) => success && this.handleAlreadyRead(this.props.discussMsgList));
  }

  handleAlreadyRead = (list = []) => {
    const { alreadyReadList } = this.state;
    list.forEach(v => v.status === 1 && alreadyReadList.push(v.mid));
    this.setState({ alreadyReadList });
  }

  tabChange = (key) => {
    // toFix：tabChange在dom还未更新就被触发，这里的setTimeout勉强是一种hack写法
    key === '2' && setTimeout(this.lazyHandler, 500);
  }

  noMsgNow = () => (
    <div className={style.noMsgContainer}>
      <img src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/no-thing.png" alt="" />
      <div className={style.noMsgTip}>空空如也～</div>
    </div>
  );

  render() {
    const {
      discussMsgList,
      systemMsgList,
      discussMsgTotal,
      systemMsgTotal,
      unReadDisMsgTotal,
      unReadSysMsgTotal,
    } = this.props;

    return (
      <div id="message_center_page" className={style.messageCenter}>
        {/* <Spin size="large" spinning={loading} /> */}
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={this.tabChange}>
          <TabPane
            tab={<div>
              <Button className={style.tabBtn} fullWidth>
                <IconFont type="system-message" fontSize="22px" color="#00ADB5" />
                <Badge dot={unReadSysMsgTotal > 0}>系统通知</Badge>
              </Button></div>}
            key="1"
          >
            {systemMsgList.length ? <div className={style.messageList}>
              {systemMsgList.map(item => {
                const {
                  mid,
                  senderAvatar,
                  title = '',
                  content = '',
                  createTime = '',
                  article_id: articleId = '',
                  articleTitle = '',
                } = item;
                return (<div key={mid} id={mid} className={`message-item ${style.messageItem}`}>
                  <div className={style.itemHeader}>
                    <div className={style.avatarContainer}>
                      {
                        <img src={senderAvatar || config.logoSrc} alt="" />
                      }
                      {/* senderAvatar ?
                          <ImageView src={senderAvatar} width="50px" height="50px" /> :
                          <IconFont type="avatar" fontSize="50px" /> */}
                    </div>
                    <div className={style.infoContainer}>
                      <div className={style.primaryInfos}>
                        {`${title}${articleId ? <Link to={`/article/detail/${articleId}`}>{`《${articleTitle}》`}</Link> : ''}`}
                      </div>
                      <div className={style.otherInfo}>
                        {moment(createTime).format('YYYY-MM-DD HH:mm')}
                      </div>
                    </div>
                  </div>
                  <div className={style.itemBody}>
                    {content}
                  </div>
                </div>);
              })}
              <Pagination total={systemMsgTotal} showTotal={t => `共${t}条`} onChange={(pageNo) => this.getSystemMsgs(pageNo)} />
            </div> : this.noMsgNow()}
          </TabPane>
          <TabPane
            tab={<div>
              <Button className={style.tabBtn} fullWidth>
                <IconFont type="discuss-message" fontSize="22px" color="#00ADB5" />
                <Badge dot={unReadDisMsgTotal > 0}>我参与的讨论</Badge>
              </Button></div>}
            key="2"
          > {
              discussMsgList.length ?
                <div className={style.messageList}>
                  {discussMsgList.map(item => {
                    const {
                      mid,
                      senderAvatar,
                      senderName = '',
                      title = '',
                      article_id: articleId = '',
                      articleTitle = '',
                      content = '',
                      createTime = '',
                    } = item;
                    return (<div key={mid} id={mid} className={`message-item ${style.messageItem}`}>
                      <div className={style.itemHeader}>
                        <div className={style.avatarContainer}>
                          {
                            senderAvatar ?
                              <img alt="" src={senderAvatar} /> :
                              <IconFont type="avatar" fontSize="50px" />
                          }
                        </div>
                        <div className={style.infoContainer}>
                          <div className={style.primaryInfos}>
                            <span>{senderName}</span>在<Link to={`/article/detail/${articleId}`}>{`《${articleTitle}》`}</Link>中{title}
                          </div>
                          <div className={style.otherInfo}>
                            {moment(createTime).format('YYYY-MM-DD HH:mm')}
                          </div>
                        </div>
                      </div>
                      <div className={style.itemBody}>
                        {content}
                      </div>
                    </div>);
                  })}
                  <Pagination total={discussMsgTotal} showTotal={t => `共${t}条`} onChange={(pageNo) => this.getDiscussMsgs(pageNo)} />
                </div> :
                this.noMsgNow()
            }
          </TabPane>
        </Tabs>

      </div>
    );
  }
}

export default connect(({ mc }) => ({
  ...mc,
}))(MessageCenter);
