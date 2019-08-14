/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import React from 'react';

import {
  connect,
} from 'dva';
import { Link } from 'dva/router';
import {
  Card,
  Avatar,
  message,
  Tooltip,
  Tag,
  Table,
} from 'antd';
import Fab from '@material-ui/core/Fab';
import moment from 'moment';
import { IconFont, TeamForm } from 'components';
import * as styles from './assets/css/index.less';
import {
  User,
  Team,
  Cate,
  Article,
} from '../../utils/type'

const { Meta } = Card;

export interface HomeProps {
  dispatch: (val: any) => any
  user: User
  users: User[]
  activeUsers: User[]
  teamList: Team[]
  cateList: Cate[]
  articleList: Article[]
}

export interface HomeState {
  modalVisible: boolean
}

@connect(({ user, team, article, category = {} }) => {
  return {
    teamList: team.list || [],
    cateList: category.cateList,
    articleList: article.list || [],
    ...user,
  };
})
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object,
    users: PropTypes.array,
    activeUsers: PropTypes.array,
    teamList: PropTypes.array,
    cateList: PropTypes.array,
    articleList: PropTypes.array,
  }

  static defaultProps = {
    dispatch: () => { },
    user: {},
    users: [],
    activeUsers: [],
    teamList: [],
    articleList: [],
    cateList: [],
  };

  componentWillMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({
      type: 'team/getList',
      payload: { status: 1 },
    });
    dispatch({
      type: 'article/getList',
      payload: { pageNo: 1, pageSize: 10 },
    });
    dispatch({
      type: 'user/getUsers',
    });
    dispatch({
      type: 'user/getActiveUsers',
    });
    dispatch({
      type: 'category/getCateList',
    });
  }

  onCreate = () => {
    if (this.props.user.tid) {
      message.info('您已经加入或正在申请创建团队，目前不能新增团队');
      return;
    }
    this.setState({ modalVisible: true });
  }

  hideModal = () => {
    this.setState({ modalVisible: false });
  }

  onJoin = (tid) => () => {
    const {
      dispatch,
      user,
    } = this.props;

    if (user.tid) {
      message.info('您已经加入团队啦～目前只能加入一个团队～');
    } else {
      dispatch({
        type: 'user/join',
        payload: { tid },
      });
    }
  }

  browseTeam = (tid) => () => {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'global/routeChange', payload: { path: `/team/${tid}` } });
  }

  getCateInfo = (cateId) => {
    const { cateList = [] } = this.props;
    return cateList.find(item => item.id === cateId);
  }

  toPersonalPage = (uid) => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/personalPage/${uid}` } });
  }

  searchArticleByCate = (cate) => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/search/?cate=${cate}` } });
  }

  searchArticleByTag = (tag) => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/search/?tag=${tag}` } });
  }

  toFeedbackPage = () => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: '/feedback' } });
  }

  render() {
    const {
      teamList,
      articleList,
      user,
      activeUsers,
    } = this.props;
    const {
      modalVisible,
    } = this.state;

    const getUserInfo = (uid, field) => {
      const { users } = this.props;
      const targetUser = users.find(item => item.uid === uid) || {};
      return targetUser[field] || '';
    };

    const cateRender = (cateId) => {
      const cate = this.getCateInfo(cateId);
      return cate ? <Tag color={cate.color} onClick={() => this.searchArticleByCate(cateId || '')}>{cate.name}</Tag> : null;
    };

    const avatarRender = (uid) => {
      const avatar = getUserInfo(uid, 'avatar');
      return (
        avatar ?
          <Avatar src={avatar} /> :
          <IconFont type="avatar" fontSize="32px" color="#00adb5" />
      );
    };

    const getRank = (uid) => {
      const rankMap = [
        {
          type: 'first',
          color: '#ff6464',
        },
        {
          type: 'second',
          color: '#0092ca',
        },
        {
          type: 'third',
          color: '#ffaa64',
        },
      ];
      let index = activeUsers.findIndex(v => v.uid === uid);
      if (index < 3) {
        return <IconFont type={rankMap[index].type} fontSize="22px" color={rankMap[index].color} />;
      }
      return ++index;
    };

    const activeUserColumns = [
      {
        title: '排名',
        dataIndex: '',
        align: 'center',
        render: (text, row) => <div>{getRank(row.uid)}</div>,
      },
      {
        title: '昵称',
        dataIndex: 'uid',
        align: 'center',
        render: uid => <div className={styles.activeName} onClick={this.toPersonalPage.bind(this, uid)}>{getUserInfo(uid, 'name')}</div>,
      },
      {
        title: '文章数',
        dataIndex: 'sum',
        align: 'center',
        render: sum => <div>{sum}</div>,
      },
    ];

    return (
      <div className={styles.homePage}>
        <div className={styles.teamList}>
          <div className={styles.teamListHeader}>
            团队一览
          </div>
          <div className={styles.teamListBody}>
            {
              teamList.map(v => (
                <Card
                  key={v.tid}
                  cover={<img alt="" src={v.avatar} onClick={this.browseTeam(v.tid)} />}
                  actions={[(<Tooltip placement="bottom" title="浏览">
                    <span onClick={this.browseTeam(v.tid)}><IconFont type="browse" fontSize="18px" /></span>
                  </Tooltip>),
                  user.tid === v.tid ?
                    <Tooltip placement="bottom" title="我的团队">
                      <span onClick={this.browseTeam(v.tid)}><IconFont type="group1" fontSize="22px" /></span>
                    </Tooltip> :
                    <Tooltip placement="bottom" title="加入团队">
                      <span onClick={this.onJoin(v.tid)}><IconFont type="add-member" fontSize="18px" /></span>
                    </Tooltip>]}
                  className={styles.teamItem}
                >
                  <Meta
                    avatar={avatarRender(v.owner)}
                    title={v.name}
                    description={`${getUserInfo(v.creater, 'name')} • 创建于${moment(v.createTime).format('YYYY-MM-DD')}`}
                  />
                </Card>
              ))
            }
            <div className={styles.createTeam}>
              <Fab aria-label="add" className={styles.addTeamBtn} onClick={this.onCreate}>
                <IconFont type="add" fontSize="16px" />
              </Fab>
            </div>
          </div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.articleList}>
            <div className={styles.articleListHeader}>最新文章</div>
            <div className={styles.articleListBody}>
              {articleList.map(item => {
                const { id, uid, title, author, tags = '' } = item;
                const itemAvatar = getUserInfo(uid, 'avatar');
                return (
                  <div key={id} className={styles.articleItem}>
                    {itemAvatar ?
                      <img alt="" src={itemAvatar} className={styles.authorAvatar} /> :
                      <div className={styles.authorName}>{author}</div>
                    }
                    <div className={styles.info}>
                      <div className={styles.title}>
                        <Link to={`/article/detail/${id}`}>{title}</Link>
                        {cateRender(item.cate)}
                      </div>
                      <div>
                        <span className={styles.infoItem}><IconFont type="time" color="#F38181" />{moment(item.updateTime).format('YYYY-MM-DD HH:mm')}</span>
                        {+item.comments ? <span className={styles.infoItem}><IconFont type="comment" color="#F38181" />{item.comments}</span> : null}
                      </div>
                      {tags ?
                        <div className={styles.tags}>
                          <IconFont type="tag" color="#F38181" fontSize="20px" />
                          {tags.split(',').map(tag => <span key={`${id}-${tag}`} className={styles.tag} onClick={() => this.searchArticleByTag(tag)}>{tag}</span>)}
                        </div> : null}
                    </div>
                  </div>);
              })}
            </div>
          </div>
          <div className={styles.userList}>
            <div className={styles.userListHeader}>活跃用户</div>
            <div className={styles.userListBody}>
              <Table
                rowKey="uid"
                columns={activeUserColumns}
                dataSource={activeUsers}
                pagination={{ pageSize: 20 }}
              />
            </div>
          </div>
        </div>
        <div className={styles.feedbackIntro} onClick={this.toFeedbackPage}>
          <IconFont type="bilibili" fontSize="36px" />
        </div>
        <TeamForm modalVisible={modalVisible} hide={this.hideModal} />
      </div>
    );
  }
}

export default Home;
