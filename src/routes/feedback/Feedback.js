/* eslint-disable no-unused-expressions,no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Select, Input, DatePicker, Tag, Pagination } from 'antd';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { IconFont } from 'components';
import { showOffsetTime } from 'utils';
import styles from './assets/style/index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormater = 'YYYY-MM-DD';
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

@connect(({ user, feedback }) => {
  return {
    users: user.users,
    issueList: feedback.issueList,
    total: feedback.total,
  };
})
class Feedback extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      keyword: '',
      uid: '',
      from: '',
      to: '',
      status: '1',
      type: '',
      pageNo: 1,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.array,
    issueList: PropTypes.array,
    total: PropTypes.number,
  }

  static defaultProps = {
    dispatch: () => { },
    users: [],
    issueList: [],
    total: 0,
  };

  componentWillMount() {
    this.getIssueList();
  }

  getIssueList = () => {
    this.props.dispatch({ type: 'feedback/getList', payload: { ...this.state } });
  }

  keywordChange = (e) => {
    this.setState({ keyword: e.target.value });
  }

  uidChange = (uid) => {
    this.setState({ uid });
  }

  statusChange = (status) => {
    this.setState({ status });
  }

  typeChange = (type) => {
    this.setState({ type });
  }

  timeRangeChange = (date, dateString) => {
    this.setState({
      from: dateString[0],
      to: dateString[1],
    });
  }

  pageChange = (pageNo) => {
    this.setState({ pageNo }, this.getArticleList);
  }

  reset = () => {
    this.setState({
      keyword: '',
      uid: '',
      from: '',
      to: '',
      pageNo: 1,
    }, this.getIssueList);
  }

  goToIssue = (id) => {
    this.props.dispatch({
      type: 'global/routeChange',
      payload: { path: `/feedback/detail/${id}` },
    });
  }

  addFeedback = () => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: '/feedback/edit' } });
  }

  getUserInfo = (uid, info) => {
    const { users } = this.props;
    const target = users.find(v => v.uid === uid) || {};
    return target[info] || '';
  }

  render() {
    const {
      users,
      issueList,
      total,
    } = this.props;
    const {
      keyword,
      uid,
      from,
      to,
      status,
      type,
    } = this.state;

    return (<div className={styles.feedbackPage}>
      <div className={styles.filterContainer}>
        <Row gutter={16}>
          <Col span={5}>关键词：<Input style={{ width: 160 }} value={keyword} onChange={this.keywordChange} placeholder="输入关键词模糊查询" /></Col>
          <Col span={4}>反馈人：
            <Select value={uid} onChange={this.uidChange} style={{ width: 120 }} >
              <Option value="">全部</Option>
              {users.map(item => <Option key={item.uid} value={item.uid}>{item.name}</Option>)}
            </Select>
          </Col>
          <Col span={4}>状态：
            <Select value={status} onChange={this.statusChange} style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="1">开启中</Option>
              <Option value="0">已关闭</Option>
            </Select>
          </Col>
          <Col span={4}>类型：
            <Select value={type} onChange={this.typeChange} style={{ width: 120 }}>
              <Option value="">全部</Option>
              <Option value="0">Advice</Option>
              <Option value="1">Bug</Option>
            </Select>
          </Col>
          <Col span={7}>时间：<RangePicker style={{ width: 270 }} value={from ? [moment(from), moment(to)] : null} onChange={this.timeRangeChange} format={dateFormater} /></Col>
        </Row>
        <div className={styles.filterRow}>
          <Button className={styles.searchBtn} onClick={this.getIssueList}><IconFont type="search" fontSize="16px" />搜索</Button>
          <Button className={styles.resetBtn} onClick={this.reset}><IconFont type="reload" fontSize="16px" />重置</Button>
          <Button className={styles.addBtn} onClick={this.addFeedback}><IconFont type="feedback" fontSize="26px" />我有话说</Button>
        </div>
      </div>
      {issueList.length ?
        <div className={styles.issueList}>

          {issueList.map(issue => {
            const { id, title, author, type: itemType, status: itemStatus, replys, createTime } = issue;
            const typeObj = typeMap[String(itemType)] || {};
            const avatar = this.getUserInfo(author, 'avatar');
            return (<div className={styles.issue} key={id}>
              <div className={styles.avatar}>
                {avatar ? <img src={avatar} alt="" /> : <IconFont type="avatar" fontSize="90px" />}
              </div>
              <div className={styles.info}>
                <div className={styles.infoHeader}>
                  <span className={styles.title}>
                    <Link to={`/feedback/detail/${id}`}>{title}</Link>
                  </span>
                  <Tag color={typeObj.color}>{typeObj.name}</Tag>
                </div>
                <div className={styles.infoBody}>
                  {this.getUserInfo(author, 'name')}在 {showOffsetTime(createTime)} 提交
                </div>
                <div className={styles.infoFooter}>
                  {itemStatus ?
                    <span className={styles.item}><IconFont type="time1" color="#00adb5" />进行中</span> :
                    <span className={styles.item}><IconFont type="forbid" color="#f08a5d" />已关闭</span>
                  }
                  <span className={styles.item}><IconFont type="comment" color="#00adb5" />{replys}</span>
                </div>
              </div>

            </div>);
          })}
          <Pagination total={total} showTotal={t => `共${t}条`} onChange={(pageNo) => this.pageChange(pageNo)} />
        </div> :
        <div className={styles.nothingContainer}>
          <img src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/no-thing.png" alt="" />
          <div className={styles.nothingTip}>空空如也～</div>
        </div>

      }
    </div>);
  }
}

export default Feedback;
