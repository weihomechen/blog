/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter, Link } from 'dva/router';
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';
import style from './assets/css/index.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormater = 'YYYY-MM-DD';
const initialFilter = JSON.stringify({
  keyword: '',
  type: '0',
  from: moment().add(-6, 'months').format(dateFormater),
  to: moment().format(dateFormater),
  status: 1,
  pageNo: 1,
  pageSize: 10,
});

class PersonalFeedback extends Component {
  constructor() {
    super();
    this.state = {
      filter: JSON.parse(initialFilter),
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const { uid } = this.props.user;
    const filter = JSON.parse(initialFilter);
    filter.uid = uid;
    this.setState({ filter }, this.getList);
  }

  getList = (isInitPageNo = true) => {
    const { filter } = this.state;
    isInitPageNo && (filter.pageNo = 1);
    this.props.dispatch({
      type: 'feedback/getList',
      payload: filter,
    });
  }

  titleChange = (e) => {
    let { filter } = this.state;
    filter = {
      ...filter,
      keyword: e.target.value,
    };
    this.setState({ filter });
  }

  timeRangeChange = (date, dateString) => {
    let { filter } = this.state;
    const [from, to] = dateString;
    filter = {
      ...filter,
      from,
      to,
    };
    this.setState({ filter });
  }

  pageChange = async (pageNo) => {
    const { filter } = this.state;
    filter.pageNo = pageNo;
    this.setState({ filter }, () => {
      this.getList(false);
    });
  }

  closeIssue = (id) => {
    this.props
      .dispatch({ type: 'feedback/closeIssue', payload: { id, status: 0 } })
      .then(({ success }) => success && this.getList());
  }

  editFeedback = (id) => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/feedback/edit/${id}` } });
  }

  typeChange = (type) => {
    let { filter } = this.state;
    filter = {
      ...filter,
      type,
    };
    this.setState({ filter });
  }

  render() {
    const { loading, total, issueList } = this.props;
    const {
      keyword,
      from,
      to,
      type,
      pageNo,
      pageSize,
    } = this.state.filter;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        width: '400px',
        render: (text, record) => <Link to={`/feedback/detail/${record.id}`}>{text}</Link>,
      },
      {
        title: '时间',
        dataIndex: 'updateTime',
        width: '100px',
        render: text => moment(text).format(dateFormater),
      },
      {
        title: '操作',
        width: 150,
        render: (text, record) => (<div>
          <Button className={`${style.editBtn} custom-btn-edit`} onClick={this.editFeedback.bind(this, record.id)}>编辑</Button>
          <Button className={`${style.editBtn} custom-btn-del`} onClick={this.closeIssue.bind(this, record.id)}>关闭</Button>
        </div>),
      },
    ];

    return (
      <div className={style.personCenter}>
        <div className={style.feedbackData}>
          <div className={style.title}>我的反馈</div>
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span="6">
                <Input placeholder="请输入标题" value={keyword} onChange={this.titleChange} />
              </Col>
              <Col span="10">
                时间：<RangePicker
                  value={[moment(from), moment(to)]}
                  onChange={this.timeRangeChange}
                  allowClear={false}
                />
              </Col>
              <Col span="4">
                <Select value={type} onChange={this.typeChange}>
                  <Option value="0">advice</Option>
                  <Option value="1">bug</Option>
                </Select>
              </Col>
              <Col span="4">
                <Button type="primary" onClick={this.getList.bind(this, false)} style={{ marginRight: 6 }} >查询</Button>
              </Col>
            </Row>
          </div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={issueList}
            pagination={{
              current: pageNo,
              total,
              pageSize,
              onChange: this.pageChange,
              showQuickJumper: true,
              showTotal: t => `共${t}条`,
            }}
            bordered
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

PersonalFeedback.propTypes = {
  loading: PropTypes.bool,
  issueList: PropTypes.array,
  total: PropTypes.number,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

PersonalFeedback.defaultProps = {
  loading: false,
  issueList: [],
  total: 0,
  user: {},
  dispatch: () => { },
};

function mapStateToProps({ loading, user, feedback }) {
  return {
    loading: loading.models.feedback,
    ...user,
    ...feedback,
  };
}

export default withRouter(connect(mapStateToProps)(PersonalFeedback));
