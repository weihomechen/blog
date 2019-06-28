import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter, Link } from 'dva/router';
import {
  Table,
  Input,
  Popconfirm,
  Button,
  Row,
  Col,
  message,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';
import style from './assets/css/index.less';
import {
  Article,
  User,
  Dispatch,
} from '../../utils/type'

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormater = 'YYYY-MM-DD';
const initialState = JSON.stringify({
  title: '',
  from: moment().add(-6, 'months').format(dateFormater),
  to: moment().format(dateFormater),
  status: 1,
  pageNo: 1,
  pageSize: 10,
  selectedRowKeys: [],
});

export interface PersonCenterProps {
  loading: boolean
  list: Article[]
  total: number
  user: User
  dispatch: Dispatch
}

export interface PersonCenterState {
  title: string
  from: string
  to: string
  status: number
  pageNo: number
  pageSize: number
  selectedRowKeys: number[]
}

class PersonCenter extends Component<PersonCenterProps, PersonCenterState> {
  constructor(props) {
    super(props);
    this.state = JSON.parse(initialState);
  }

  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    total: PropTypes.number,
    user: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    list: [],
    total: 0,
    user: {},
    dispatch: () => { },
  };

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    const { uid } = this.props.user;
    const state = JSON.parse(initialState);
    state.uid = uid;
    this.setState(state, () => this.getList());
  }

  getList = () => {
    const {
      selectedRowKeys,
      ...filter
    } = this.state;

    this.props.dispatch({
      type: 'article/getList',
      payload: filter,
    });
  }

  titleChange = (e) => {
    this.setState({ title: e.target.value, pageNo: 1 });
  }

  timeRangeChange = (date, dateString) => {
    this.setState({ from: dateString[0], to: dateString[1], pageNo: 1 });
  }

  pageChange = async (pageNo) => {
    this.setState({ pageNo }, () => {
      this.getList();
    });
  }

  showSizeChange = async (pageNo, pageSize) => {
    this.setState({ pageNo: 1, pageSize }, () => {
      this.getList();
    });
  }

  selectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  deleteArticle = () => {
    const { selectedRowKeys } = this.state;
    this.props
      .dispatch({ type: 'article/removeArticle', payload: { selectedRowKeys } })
      .then(({ success }) => success && this.getList());
  }

  toWritePage = (id) => {
    this.props.dispatch({ type: 'global/routeChange', payload: { path: `/article/edit/${id}` } });
  }

  uploadAvatar = (uid, param) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    const errorFn = () => {
      message.error('上传失败');
    };
    fd.append('uid', uid);
    fd.append('file', param.file);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.props.dispatch({ type: 'user/queryUser' });
      }
    };
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);
    xhr.open('POST', param.action);
    xhr.send(fd);
  }

  statusChange = (status) => {
    this.setState({ status });
  }

  render() {
    const { loading, total, list } = this.props;
    const {
      title,
      from,
      to,
      status,
      pageNo,
      pageSize,
      selectedRowKeys,
    } = this.state;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        render: (text, record) => <Link to={`/article/detail/${record.id}`}>{text}</Link>,
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '时间',
        dataIndex: 'updateTime',
        render: text => moment(text).format(dateFormater),
      },
      {
        title: '操作',
        width: 150,
        render: (text, record) => <Button className={`${style.editBtn} custom-btn-edit`} onClick={this.toWritePage.bind(this, record.id)}>编辑</Button>,
      },
    ];

    return (
      <div className={style.personCenter}>
        <div id="articleManage" className={style.articleData}>
          <div className={style.title}>文章管理</div>
          <div style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Input placeholder="请输入标题" value={title} onChange={this.titleChange} />
              </Col>
              <Col span={10}>
                时间：<RangePicker
                  value={from ? [moment(from), moment(to)] : null}
                  onChange={this.timeRangeChange}
                  allowClear={false}
                />
              </Col>
              <Col span={4}>
                <Select value={status} onChange={this.statusChange}>
                  <Option value={1}>文章</Option>
                  <Option value={0}>草稿</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={this.getList} style={{ marginRight: 6 }} >查询</Button>
                {/* <Button type="primary" onClick={this.initFilter} >重置条件</Button> */}
              </Col>
            </Row>
          </div>
          <Popconfirm
            title="是否确认批量删除"
            onConfirm={this.deleteArticle}
          >
            <Button type="primary" className="custom-btn-del" style={{ marginBottom: 12, display: selectedRowKeys.length ? '' : 'none' }}>删除</Button>
          </Popconfirm>
          <Table
            rowSelection={{ selectedRowKeys, onChange: this.selectedChange }}
            rowKey="id"
            columns={columns}
            dataSource={list}
            pagination={{
              current: pageNo,
              total,
              pageSize,
              onChange: this.pageChange,
              onShowSizeChange: this.showSizeChange,
              showSizeChanger: true,
              pageSizeOptions: [
                '10',
                '20',
                '30',
              ],
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

function mapStateToProps({ loading, user, article }) {
  return {
    loading: loading.models.article,
    ...user,
    ...article,
  };
}

export default withRouter(connect(mapStateToProps)(PersonCenter));
