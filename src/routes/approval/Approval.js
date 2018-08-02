/* eslint-disable no-unused-expressions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Table, Input, Popconfirm, message } from 'antd';
import Button from 'material-ui/Button';
import moment from 'moment';
import style from './assets/css/index.less';

const statusMap = ['待审批', '已同意', '已驳回'];
const DATE_FORMATER = 'YYYY-MM-DD HH:mm';
const { TextArea } = Input;

class Approval extends PureComponent {
  constructor() {
    super();
    this.state = {
      pageNo: 1,
      reason: '',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    list: PropTypes.arrayOf(PropTypes.object),
    total: PropTypes.number,
    loading: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => { },
    list: [],
    total: 0,
    loading: false,
    users: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const {
      dispatch,
    } = this.props;
    const { pageNo } = this.state;

    dispatch({
      type: 'approval/getList',
      payload: { pageNo },
    });
  }

  confirm = (aid, status) => {
    const { dispatch } = this.props;
    const { reason } = this.state;

    if (+status === 2 && !reason) {
      message.error('请说一下不约的理由😂');
      return;
    }

    dispatch({
      type: 'approval/update',
      payload: { aid, status, reason },
    }).then((success, msg) => {
      if (success) {
        this.getList();
        this.setState({ reason: '' });
        dispatch({ type: 'user/getUsers' });
      } else {
        message.error(msg);
      }
    });
  }

  reasonChange = (e) => {
    this.setState({ reason: e.target.value });
  }

  pageChange = (pageNo) => {
    this.setState({ pageNo }, () => this.getList());
  }

  rejectRender = () => (<div>
    <div>确认驳回该申请？</div>
    <TextArea placeholder="请填写驳回理由" onChange={this.reasonChange} style={{ width: 180, marginTop: 12 }} autosize={{ minRows: 2, maxRows: 3 }} />
  </div>);

  render() {
    const {
      loading,
      list,
      total,
      users,
    } = this.props;
    const {
      pageNo,
    } = this.state;
    const columns = [
      {
        title: '申请/发起人',
        dataIndex: 'applicant',
        render: uid => (users.find(v => v.uid === uid) || {}).name,
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '申请/发起时间',
        dataIndex: 'createTime',
        render: t => moment(t).format(DATE_FORMATER),
      },
      {
        title: '备注',
        dataIndex: 'reason',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status, item) => (<div>
          {+status === 0 ? (<div>
            <Popconfirm title="确认同意？" onConfirm={this.confirm.bind(this, item.aid, 1)}>
              <Button className={style.approveBtn}>同意</Button>
            </Popconfirm>
            <Popconfirm title={this.rejectRender()} onConfirm={this.confirm.bind(this, item.aid, 2)}>
              <Button className={style.rejectBtn}>驳回</Button>
            </Popconfirm>
          </div>) : statusMap[status]}
        </div>),
      },
    ];

    return (
      <div className={style.approvalPage}>
        <div className={style.title}>审批管理</div>
        <Table
          rowKey="aid"
          columns={columns}
          dataSource={list}
          pagination={{
            current: pageNo,
            total,
            onChange: this.pageChange,
            showQuickJumper: true,
            showTotal: t => `共${t}条`,
          }}
          bordered
          loading={loading}
        />
      </div>
    );
  }
}

export default connect(({ approval, user, loading }) => ({
  loading: loading.models.approval,
  ...user,
  ...approval,
}))(Approval);
