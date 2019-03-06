import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter, Link } from 'dva/router';
import { Pagination, Spin, Tabs, Modal, message } from 'antd';
import { IconFont, TeamForm, ArticleItem } from 'components';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import style from './assets/css/index.less';

const defaultTeamAbstract = '震惊！这个团队竟然没有简介...';
const { TabPane } = Tabs;
const { confirm } = Modal;

class Team extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      inviteModalVisible: false,
      currentMember: '',
      alreadyInvited: [],
    };
  }

  componentDidMount() {
    this.getArticleList();
    this.getTeamDetail();
  }

  getArticleList = async (pageNo = 1, pageSize = 10) => {
    const {
      match,
      dispatch,
    } = this.props;

    dispatch({
      type: 'article/getList',
      payload: { pageNo, pageSize, tid: match.params.tid },
    });
  }

  getTeamDetail = async () => {
    const {
      match,
      dispatch,
    } = this.props;

    dispatch({
      type: 'team/getDetail',
      payload: { tid: match.params.tid },
    });
  }

  goToArticle = (id) => {
    this.props.dispatch({
      type: 'global/routeChange',
      payload: { path: `/article/detail/${id}` },
    });
  }

  pageChange = (pageNo) => {
    this.getArticleList(pageNo);
  }

  getCateInfo = (cateId) => {
    const { cateList = [] } = this.props;
    return cateList.find(item => item.id === cateId) || { name: '其它', color: '#00bcd4' };
  }

  getUserInfo = (condition, infoField, returnField) => {
    const { users = [] } = this.props;
    const targetUser = users.find(item => item[infoField] === condition) || {};
    return targetUser[returnField] || '';
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  hideInviteModal = () => {
    this.setState({ inviteModalVisible: false });
  }

  openInviteModal = () => {
    this.setState({ inviteModalVisible: true });
  }

  nothingNow = () => (
    <div className={style.nothingContainer}>
      <img src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/no-thing.png" alt="" />
      <div className={style.nothingTip}>空空如也～快去发表文章吧</div>
    </div>
  );

  confirmOut = () => {
    const { user, team } = this.props;
    const { uid } = user;
    const { tid } = team;

    confirm({
      title: '是否确定退出当前团队?',
      content: '',
      onOk: () => {
        this.props.dispatch({ type: 'user/exitTeam', payload: { uid, tid } });
      },
    });
  }

  transferTeam = () => {
    const { team } = this.props;
    const { currentMember: owner } = this.state;
    const { tid } = team;

    confirm({
      title: '是否确定转让当前团队给该成员?',
      content: '一个团队目前只有一个管理员，转让后您不会自动退出团队，而且该成员会成为新的管理员',
      onOk: () => {
        this.props.dispatch({ type: 'team/save', payload: { tid, owner } }).then(({ success, msg }) => {
          if (success) {
            message.success('转让成功', 2, () => window.location.reload());
          } else {
            message.error(msg);
          }
        });
      },
    });
  }

  kickMember = () => {
    const { currentMember: uid } = this.state;
    const { tid } = this.props.team;

    confirm({
      title: '是否确定踢出该成员?',
      content: '踢出后该成员不再属于您的团队',
      onOk: () => {
        this.props.dispatch({ type: 'user/kicked', payload: { uid, tid } });
      },
    });
  }

  showMemberHandler = (currentMember) => {
    this.setState({ currentMember });
  }

  hideMemberHandler = () => {
    this.setState({ currentMember: null });
  }

  render() {
    const {
      loading,
      team,
      list,
      total,
      user,
      users,
      dispatch,
    } = this.props;
    const { modalVisible, inviteModalVisible, currentMember, alreadyInvited } = this.state;
    const memberList = users.filter(item => item.tid === team.tid) || [];
    const notTeamUsers = users.filter(v => !v.tid && !alreadyInvited.find(a => a === v.uid)) || [];
    const { tid } = team;
    const toPersonalPage = (uid) => {
      dispatch({ type: 'global/routeChange', payload: { path: `/personalPage/${uid}` } });
    };

    const submitInvite = (uid) => {
      dispatch({ type: 'user/invite', payload: { tid, uid } }).then(({ success, msg }) => {
        if (success) {
          message.success('邀请成功', 1, () => {
            alreadyInvited.push(uid);
            this.setState({ alreadyInvited });
          });
        } else {
          message.error(msg);
        }
      });
    };

    return (
      <div className={style.teamPage}>
        <Spin size="large" spinning={loading} />
        <div className={style.articleListContainer}>
          <div className={style.infoWrapper}>
            <img alt="" className={style.avatar} src={team.avatar} />
            <div className={style.infos}>
              <div className={style.name}>
                {team.name}
                {!team.status ?
                  <Tooltip title="通过审核前，此团队只有申请人可见" placement="top">
                    <span className={style.tip}>(等待审核中...)</span>
                  </Tooltip> : null}
              </div>
              <div className={style.infoItem}>
                <Tooltip title="团队管理员" placement="top">
                  <span><IconFont type="manager" fontSize="14px" color="#00ADB5" />{this.getUserInfo(team.owner, 'uid', 'name')}</span>
                </Tooltip>
              </div>
              <div className={style.abstract}>{team.abstract || defaultTeamAbstract}</div>
            </div>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={<div><Button className={style.tabBtn} fullWidth><IconFont type="list" fontSize="16px" />最新文章</Button></div>}
              key="1"
            >
              {list.length ?
                <div>
                  {list.map(item => <ArticleItem uid={user.uid} article={item} key={item.id} cate={this.getCateInfo(item.cate)} onClick={this.goToArticle} />)}
                  <Pagination total={total} showTotal={t => `共${t}篇`} onChange={pageNo => this.pageChange(pageNo)} />
                </div> : this.nothingNow()}
            </TabPane>
          </Tabs>
        </div>
        <div className={style.memberContainer}>
          <div className={style.header}>
            <span>
              团队概况
              {
                user.uid === team.owner ?
                  <IconButton className={style.editBtn} onClick={this.openModal}>
                    <IconFont type="edit" fontSize="24px" color="#00ADB5" />
                  </IconButton> : null
              }
              {
                user.uid !== team.owner && user.uid === tid ?
                  <IconButton className={style.outBtn} onClick={this.confirmOut}>
                    <IconFont type="out1" fontSize="22px" color="#f38181" />
                  </IconButton> : null
              }
            </span>
          </div>
          <div className={style.infoList}>
            <div className={style.infoItem}><IconFont type="time1" fontSize="18px" color="#00ADB5" /> 创建于<i>{moment(team.createTime).format('YYYY-MM-DD')}</i></div>
            <div className={style.infoItem}><IconFont type="list1" fontSize="18px" color="#00ADB5" /> 目前收录了<i>{total}</i>篇文章</div>
            <div className={style.infoItem}><IconFont type="group" fontSize="18px" color="#00ADB5" /> 现在有<i>{memberList.length}</i>位小伙伴在这里玩耍</div>
          </div>
          <div className={style.header}>
            <span>团队成员
              {
                user.uid === team.owner ?
                  <IconButton className={style.inviteBtn} onClick={this.openInviteModal}>
                    <IconFont type="add-member" fontSize="18px" color="#00ADB5" />
                  </IconButton> : null
              }
            </span>
          </div>
          <div className={style.memberList}>
            {memberList.map(item => (
              <div
                key={item.uid}
                className={style.memberItem}
              >
                <div
                  className={style.memberAvatar}
                  onMouseEnter={this.showMemberHandler.bind(this, item.uid)}
                  onMouseLeave={this.hideMemberHandler}
                >
                  {item.avatar ? <img alt="" src={item.avatar} /> : <IconFont type="avatar" fontSize="80px" />}
                  {user.uid === team.owner && item.uid === currentMember && item.uid !== team.owner ?
                    <div className={style.showHandler}>
                      <div className={style.transfer} onClick={this.transferTeam}><IconFont type="transfer" fontSize="15px" /> 转让</div>
                      <div className={style.kickOut} onClick={this.kickMember}><IconFont type="out1" fontSize="15px" /> 踢出</div>
                    </div> : null}
                </div>
                <Link to={`/personalPage/${item.uid}`} className={style.name}>{item.name}</Link>
              </div>))}
          </div>
        </div>
        <TeamForm modalVisible={modalVisible} hide={this.hideModal} teamDTO={team} />
        <Modal
          title="邀请加入团队"
          visible={inviteModalVisible}
          className={style.inviteModal}
          onCancel={this.hideInviteModal}
          footer={<div className={style.modalFooter}><Button className={style.cancelBtn} onClick={this.hideInviteModal}>取消</Button></div>}
        >
          <div className={style.inviteMember}>
            {notTeamUsers.map(item => {
              const { uid, name, avatar } = item;
              return (<div className={style.notTeamUser} key={item.uid}>
                <div
                  className={style.avatar}
                  onMouseEnter={this.showMemberHandler.bind(this, item.uid)}
                  onMouseLeave={this.hideMemberHandler}
                >
                  {avatar ? <img src={avatar} alt="" /> : <IconFont type="avatar" fontSize="60px" color="#00adb5" />}
                  {user.uid === team.owner && item.uid === currentMember ?
                    <div className={style.showHandler}>
                      <div className={style.invite} onClick={() => submitInvite(uid)}><IconFont type="add-member" fontSize="15px" /> 邀请</div>
                    </div> : null}
                </div>
                <div className={style.actions}>
                  <span onClick={() => toPersonalPage(uid)}>{name}</span>
                </div>
              </div>);
            })}
          </div>
        </Modal>
      </div>
    );
  }
}

Team.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  team: PropTypes.object,
  user: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  cateList: PropTypes.array,
};

Team.defaultProps = {
  dispatch: () => { },
  loading: false,
  list: [],
  total: 0,
  team: {},
  user: {},
  users: [],
  cateList: [],
};

function mapStateToProps({ loading, team, user, article, category }) {
  return {
    loading: loading.models.team,
    team: team.team,
    ...category,
    ...user,
    ...article,
  };
}

export default withRouter(connect(mapStateToProps)(Team));
