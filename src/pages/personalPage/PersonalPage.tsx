import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'dva';
import { Link, Router } from 'dva/router';
import {
  Tabs,
  Pagination,
} from 'antd';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { IconFont } from 'components';
import { showOffsetTime } from 'utils';
import * as style from './assets/style/index.less';
import {
  Dispatch,
  User,
  Team,
  Article,
} from '../../utils/type';

const { TabPane } = Tabs;
const DEFAULT_MOTTO = '神秘人物，谁知道呢';

export interface PersonalPageProps {
  dispatch: Dispatch;
  match: any;
  user: User;
  users: User[];
  teamList: Team[];
  articleList: Article[];
  articleTotal: number;
}

export interface PersonalPageState {
  uid: number | string;
}

@connect(({ user, article, team }) => {
  return {
    user: user.user,
    users: user.users,
    teamList: team.list,
    articleList: article.list || [],
    articleTotal: article.total,
  };
})
class PersonalPage extends React.PureComponent<PersonalPageProps, PersonalPageState> {

  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.object,
    user: PropTypes.object,
    users: PropTypes.array,
    teamList: PropTypes.array,
    articleList: PropTypes.array,
    articleTotal: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => { },
    match: {},
    user: {},
    users: [],
    teamList: [],
    articleList: [],
    articleTotal: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
    };
  }

  componentWillMount() {
    const { dispatch, match } = this.props;
    const { uid } = match.params;
    this.setState({ uid: +uid }, () => {
      dispatch({ type: 'team/getList' });
      this.getArticleList();
    });
  }

  getArticleList = (pageNo = 1) => {
    const { uid } = this.state;
    this.props.dispatch({ type: 'article/getList', payload: { uid, pageNo } });
  }

  pageChange = (pageNo) => {
    this.getArticleList(pageNo);
  }

  nothingNow = () => (
    <div className={style.nothingContainer}>
      <img src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/no-thing.png" alt="" />
      <div className={style.nothingTip}>空空如也～快去发表文章吧</div>
    </div>
  )

  DEFAULT_MOTTO = () => <span>{DEFAULT_MOTTO}<IconFont type="question" fontSize="26px" /></span>;

  render() {
    const {
      user,
      users = [],
      teamList = [],
      articleList,
      articleTotal,
      dispatch,
    } = this.props;
    const { uid } = this.state;
    const person = users.find(v => v.uid === +uid) || {} as User;
    if (users.length && !person.uid) {
      dispatch({ type: 'global/routeChange', payload: { path: '/error' } });
    }
    const { name, avatar, cover, tid, motto } = person;
    const team = teamList.find(v => v.tid === tid) || {} as Team;

    return (
      <div className={style.personalPage}>
        <div className={style.personalInfos}>
          <div className={style.coverContainer}>
            <img alt="" src={cover || 'https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/words.png'} />
          </div>
          <div className={style.infosContainer}>
            {avatar ?
              <img alt="" src={avatar} /> :
              <div className={style.svgContainer}><IconFont type="avatar" fontSize="130px" color="#00adb5" /></div>
            }
            <div className={style.infos}>
              <div className={style.name}>{name}{motto ? <span>{motto}</span> : this.DEFAULT_MOTTO()}</div>
              <div className={style.team}><IconFont type="group1" fontSize="18px" />{team.name}</div>
            </div>
            {
              user.uid === uid ?
                <Tooltip title="编辑个人资料">
                  <Button variant="fab" aria-label="edit" className={style.editButton}>
                    <Link to="/personal/profile"><IconFont type="edit" fontSize="22px" /></Link>
                  </Button>
                </Tooltip> : null
            }
          </div>
        </div>
        <div className={style.personalNews}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={<div>
                <Button className={style.tabBtn} fullWidth>
                  <IconFont type="list" fontSize="18px" />文章
                </Button>
              </div>}
              key="1"
            >
              {articleList.length ?
                <div className={style.articleList}>
                  {articleList.map(item => (<div key={item.id} className={style.articleItem}>
                    <div className={style.time}>{showOffsetTime(item.createTime)} • 发表了</div>
                    <Link to={`/article/detail/${item.id}`} className={style.title}>{item.title}</Link>
                    <div className={style.infos}>
                      {
                        +item.comments
                          ? <span className={style.infoItem}>
                            <IconFont type="comment" color="#F38181" />{item.comments}
                          </span>
                          : null
                      }
                    </div>
                    {item.tags ?
                      <div className={style.tags}>
                        <IconFont type="tag" color="#F38181" fontSize="20px" />
                        {item.tags.split(',').map(tag =>
                          <span key={`${item.id}-${tag}`} className={style.tag}>{tag}</span>,
                        )}
                      </div> : null}
                  </div>))}
                  <Pagination
                    total={articleTotal}
                    showTotal={t => `共${t}篇`}
                    onChange={pageNo => this.pageChange(pageNo)}
                  />
                </div> : this.nothingNow()}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default PersonalPage;
