import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Button,
  Table,
  Modal,
  Input,
  Tag,
  Row,
  message,
} from 'antd';
import { BlockPicker } from 'react-color';
import style from './assets/css/index.less';

const { confirm } = Modal;
const presetColors = ['#F47373', '#FFD3B6', '#A8E6CF', '#2CCCE4', '#928A97', '#dce775', '#F38181', '#66C6BA', '#f44336', '#F08A5D', '#00ADB5'];

export interface CateManageProps {

}

class CateManage extends Component {
  dispatch: any

  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.dispatch({ type: 'category/getCateList' });
  }

  editCate = (cate) => {
    this.dispatch({ type: 'category/editCate', payload: { cate } });
  }

  cateNameChange = (e) => {
    const name = e.target.value;
    this.dispatch({ type: 'category/cateDTOChange', payload: { name } });
  }

  cateColorChange = (color) => {
    this.dispatch({ type: 'category/cateDTOChange', payload: { color: color.hex } });
  }

  delCate = (id) => {
    confirm({
      title: '是否确定删除该分类?',
      content: '此删除操作不可恢复，删除后该分类下的文章自动变成其他分类',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.dispatch({ type: 'category/delCate', payload: { id } });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  addCate = () => {
    this.dispatch({ type: 'category/addCate' });
  }

  submitUpdate = () => {
    const { cate, cateList } = this.props;

    if (cateList.find(v => v.name === cate.name && v.id !== cate.id)) {
      message.error('分类不能出现同名，请修改分类名');
    } else {
      this.dispatch({ type: 'category/saveCate', payload: { cate } });
    }
  }

  render() {
    const {
      cateList,
      cate,
      cateModalVisible,
    } = this.props;
    cate.color = cate.color || presetColors[0];
    const cateColumns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '分类颜色',
        dataIndex: 'color',
        render: text => <Tag color={text}>{text}</Tag>,
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => {
          const isDefault = record.name === '其它';
          return (
            <div>
              <Button disabled={isDefault} className="custom-btn-edit" onClick={this.editCate.bind(this, record)} style={{ marginRight: 16 }}>编辑</Button>
              <Button disabled={isDefault} className="custom-btn-del" onClick={this.delCate.bind(this, id)}>删除</Button>
            </div>
          );
        },
      },
    ];

    return (
      <div className={style.adminCenter}>
        <div id="cateManage" className={style.cateManage}>
          <div className={style.title}>分类管理</div>
          <Button onClick={this.addCate} type="primary" style={{ marginBottom: 16 }}>新增分类</Button>
          <Table
            rowKey="id"
            columns={cateColumns}
            dataSource={cateList}
          />
          <Modal
            title={`${cate.id ? '编辑' : '新增'}分类`}
            visible={cateModalVisible}
            onOk={this.submitUpdate}
            onCancel={() => this.dispatch({ type: 'category/stateChange', payload: { cateModalVisible: false } })}
          >
            <Row>分类名称： <Input value={cate.name} onChange={this.cateNameChange} style={{ width: 300 }} /></Row>
            <Row style={{ margin: '24px 0' }}>分类颜色： <Tag style={{ width: 100 }} color={cate.color}>{cate.color}</Tag></Row>
            <Row>
              <BlockPicker
                color={cate.color || presetColors[0]}
                colors={presetColors}
                onChangeComplete={this.cateColorChange}
              />
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}

CateManage.propTypes = {
  cateModalVisible: PropTypes.bool,
  cateList: PropTypes.array,
  dispatch: PropTypes.func,
  cate: PropTypes.object,
};

CateManage.defaultProps = {
  cateModalVisible: false,
  cateList: [],
  dispatch: () => { },
  cate: {},
};

function mapStateToProps({ category }) {
  return {
    ...category,
  };
}

export default withRouter(connect(mapStateToProps)(CateManage));
