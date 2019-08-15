import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
  Input,
  DatePicker,
  Row,
  Col,
  Select,
  Pagination,
} from 'antd';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { ArticleItem, IconFont } from 'components';
import { getQuery } from 'utils';
import * as style from './assets/style/index.less';
import {
  Article,
  User,
  Cate,
  Dispatch,
} from '../../utils/type';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormater = 'YYYY-MM-DD';

export interface SearchProps {
  list: Article[];
  users: User[];
  cateList: Cate[];
  total: number;
  dispatch: Dispatch;
}

export interface SearchState {
  title: string;
  uid: number | string;
  from: string;
  to: string;
  cate: number | string;
  tag: string;
  pageNo: number;
}

@connect((({ article, user, category }) => {
  return {
    list: article.list,
    users: user.users,
    cateList: category.cateList,
    total: article.total,
  };
}))
class Search extends React.PureComponent<SearchProps, SearchState> {

  static propTypes = {
    dispatch: PropTypes.func,
    list: PropTypes.array,
    users: PropTypes.array,
    cateList: PropTypes.array,
    total: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => { },
    list: [],
    users: [],
    cateList: [],
    total: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      uid: '',
      from: '',
      to: '',
      cate: '',
      tag: '',
      pageNo: 1,
    };
  }

  componentWillMount() {
    this.getCateList();
    const title = getQuery('keyword');
    const cate = getQuery('cate');
    const tag = getQuery('tag');
    this.setState({ title, cate, tag }, this.getArticleList);
  }

  getCateList = () => {
    this.props.dispatch({ type: 'category/getCateList' });
  }

  getArticleList = () => {
    this.props.dispatch({ type: 'article/getList', payload: { ...this.state } });
  }

  titleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  uidChange = (uid) => {
    this.setState({ uid });
  }

  timeRangeChange = (date, dateString) => {
    this.setState({
      from: dateString[0],
      to: dateString[1],
    });
  }

  cateChange = (cate) => {
    this.setState({ cate });
  }

  tagChange = (e) => {
    this.setState({ tag: e.target.value });
  }

  pageChange = (pageNo) => {
    this.setState({ pageNo }, this.getArticleList);
  }

  reset = () => {
    this.setState({
      title: '',
      uid: '',
      from: '',
      to: '',
      cate: '',
      tag: '',
      pageNo: 1,
    }, this.getArticleList);
  }

  goToArticle = (id) => {
    this.props.dispatch({
      type: 'global/routeChange',
      payload: { path: `/article/detail/${id}` },
    });
  }

  getCateInfo = (cateId) => {
    const { cateList = [] } = this.props;
    return cateList.find(item => item.id === cateId) || { name: '其它', color: '#00bcd4' };
  }

  render() {
    const {
      list = [],
      users = [],
      cateList = [],
      total,
    } = this.props;
    const {
      title,
      uid,
      from,
      to,
      cate,
      tag,
    } = this.state;

    return (
      <div className={style.search}>
        <div className={style.filterContainer}>
          <Row gutter={16}>
            <Col span={6}>标题：
              <Input style={{ width: 200 }} value={title} onChange={this.titleChange} placeholder="输入关键词模糊查询" />
            </Col>
            <Col span={6}>作者：
            <Select value={uid} onChange={this.uidChange} style={{ width: 200 }} placeholder="可选择作者查询" >
                <Option value="">全部</Option>
                {users.map(user => <Option key={user.uid} value={user.uid}>{user.name}</Option>)}
              </Select>
            </Col>
            <Col span={8}>时间：
              <RangePicker
                style={{ width: 300 }}
                value={from ? [moment(from), moment(to)] : null}
                onChange={this.timeRangeChange}
                format={dateFormater}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>分类：
            <Select value={cate} onChange={this.cateChange} style={{ width: 200 }} placeholder="可选择分类查询" >
                <Option value="">全部</Option>
                {cateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            </Col>
            <Col span={6}>标签：
              <Input value={tag} onChange={this.tagChange} style={{ width: 200 }} placeholder="输入文章标签查询" />
            </Col>
            <Col span={8}>
              <Button className={style.searchBtn} onClick={this.getArticleList}><IconFont type="search" />搜索</Button>
              <Button className={style.resetBtn} onClick={this.reset}><IconFont type="reload" />重置</Button>
            </Col>
          </Row>
        </div>
        <div className={style.resultContainer}>
          <div className={style.resultList}>
            {
              list.map(item =>
                <ArticleItem
                  article={item}
                  key={item.id}
                  cate={this.getCateInfo(item.cate)}
                  onClick={this.goToArticle}
                />,
              )
            }
            <Pagination
              total={total}
              showTotal={t => `共${t}篇`}
              onChange={pageNo => this.pageChange(pageNo)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
