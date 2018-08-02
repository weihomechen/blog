import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'dva';
import {
  Icon,
  Modal,
  Form,
  Upload,
  Input,
  message,
} from 'antd';
import { checkFileSize } from '../../utils';
import * as styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
};

@connect(({ team }) => {
  return {
    teamList: team.list || [],
  };
})
class TeamForm extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: '',
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.object,
    teamList: PropTypes.array,
    modalVisible: PropTypes.bool,
    hide: PropTypes.func,
    teamDTO: PropTypes.object,
  }

  static defaultProps = {
    dispatch: () => { },
    form: {},
    teamList: [],
    modalVisible: false,
    hide: () => { },
    teamDTO: {},
  };

  componentDidMount() {
    const { avatar } = this.props.teamDTO;
    this.setState({ avatar });
  }

  beforeUpload = (file) => {
    checkFileSize(file.size);
  }

  submitTeam = (e) => {
    e.preventDefault();
    let { avatar } = this.state;
    avatar = avatar || this.props.teamDTO.avatar;
    this.setState({ avatar }, () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const {
            dispatch,
            teamList,
            teamDTO,
            hide,
          } = this.props;
          const { tid } = teamDTO;
          const { avatar } = this.state;
          const { name, abstract } = values;
          if (teamList.find(v => v.name === name && v.tid !== tid)) {
            message.error('团队名称不能和其他团队重复～');
            return;
          }
          if (avatar) {
            dispatch({
              type: 'team/save',
              payload: {
                tid,
                name,
                avatar,
                abstract,
              },
            }).then((success, msg) => {
              if (success) {
                hide();
                message.success(tid ? '修改团队信息成功' : '申请创建团队成功，请留意未读消息，获取最新进度', 2, () => window.location.reload());
              } else {
                message.error(msg);
              }
            });
          } else {
            message.error('请上传封面且等待封面上传完成');
          }
        }
      });
    })
  }

  handleCancel = () => {
    const { hide, teamDTO } = this.props;
    const { avatar } = teamDTO;
    this.setState({ avatar });
    hide();
  }

  uploadAvatar = (param) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    const errorFn = () => {
      message.error('上传失败');
    };
    fd.append('file', param.file);
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const avatar = (JSON.parse(e.currentTarget.response) || {}).data;
        this.setState({ avatar });
      }
    };
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);
    xhr.open('POST', param.action);
    xhr.send(fd);
  }

  render() {
    const {
      teamList,
      form,
      modalVisible,
      hide,
      teamDTO,
    } = this.props;
    const { tid, name, abstract } = teamDTO;
    const { getFieldDecorator } = form;
    let {
      avatar,
    } = this.state;
    avatar = avatar || teamDTO.avatar;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className={styles.uploadText}>点击上传封面</div>
      </div>
    );

    return (
      <Modal
        title={tid ? '更改团队' : '创建团队'}
        visible={modalVisible}
        onOk={this.submitTeam}
        onCancel={this.handleCancel}
        maskClosable={false}
        destroyOnClose
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="团队名称"
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填写团队名称' }],
              initialValue: name,
            })(<Input placeholder="团队名称" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="团队简介"
            hasFeedback
          >
            {getFieldDecorator('abstract', {
              rules: [
                { required: false, message: '请填写团队简介' },
                { max: 50, message: '请输入50个字符内的团队简介' },
              ],
              initialValue: abstract,
            })(<TextArea
              maxLength={50}
              autosize={{ minRows: 2, maxRows: 4 }}
              placeholder="团队简介"
            />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="团队封面"
          >
            {getFieldDecorator('avatar', {
              rules: [
                { required: false, message: '请上传团队封面' },
              ],
            })(
              <Upload
                listType="picture-card"
                className={styles.avatarUploader}
                showUploadList={false}
                action="/blog/api/team/upload"
                beforeUpload={this.beforeUpload}
                customRequest={this.uploadAvatar}
              >
                {avatar ? <img src={avatar} alt="" className={styles.uploadedAvatar} /> : uploadButton}
              </Upload>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TeamForm);
