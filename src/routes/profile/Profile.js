import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Upload,
  Icon,
  message,
  Input,
  Button,
} from 'antd';
import style from './assets/css/index.less';

const { TextArea } = Input;

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('请选择小于2M的图片');
  }
  return isLt2M;
}

class PersonCenter extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  uploader = (type, param) => {
    const { uid } = this.props.user;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    const errorFn = () => {
      message.error('上传失败');
    };
    fd.append('uid', uid);
    fd.append('type', type);
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

  saveMotto = () => {
    const motto = this.mottoInput.textAreaRef.value;
    const { uid } = this.props.user;

    if (motto) {
      this.props.dispatch({ type: 'user/update', payload: { motto, uid } });
    } else {
      message.error('请输入座右铭');
    }
  }

  render() {
    const { user } = this.props;
    const { avatar, cover, motto, moneyCode } = user;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className={style.uploadText}>点击上传</div>
      </div>
    );

    return (
      <div className={style.personCenter}>
        <div id="personData" className={style.personData}>
          <div className={style.title}>个人头像</div>
          <div className={style.avatar}>
            <Upload
              listType="picture-card"
              className={style.avatarUploader}
              showUploadList={false}
              action="/blog/api/user/upload"
              beforeUpload={beforeUpload}
              customRequest={this.uploader.bind(this, 0)}
            >
              {avatar ? <img src={avatar} alt="" /> : uploadButton}
            </Upload>
            <p className={style.uploadTip}><Icon type="cloud-upload" />点击可上传或修改头像，请选择小于2M的图片, 建议选择正方形图片</p>
          </div>
          <div className={style.title}>主页封面</div>
          <div className={style.cover}>
            <Upload
              listType="picture-card"
              className={style.coverUploader}
              showUploadList={false}
              action="/blog/api/user/upload"
              beforeUpload={beforeUpload}
              customRequest={this.uploader.bind(this, 1)}
            >
              {cover ? <img src={cover} alt="" /> : uploadButton}
            </Upload>
            <p className={style.uploadTip}><Icon type="cloud-upload" />点击可上传或修改个人主页封面，请选择小于2M的图片, 建议选择4:3图片</p>
          </div>
          <div className={style.title}>座右铭</div>
          <div className={style.motto}>
            <TextArea
              ref={input => this.mottoInput = input}
              defaultValue={motto}
              placeholder="请输入100个字符内的座右铭"
              autosize={{ minRows: 2, maxRows: 4 }}
              maxLength="100"
            />
            <Button type="primary" onClick={this.saveMotto} className={style.saveMottoBtn}>保存</Button>
          </div>
          <div className={style.title}>我的收钱码</div>
          <div className={style.moneyCode}>
            <Upload
              listType="picture-card"
              className={style.moneyCodeUploader}
              showUploadList={false}
              action="/blog/api/user/upload"
              beforeUpload={beforeUpload}
              customRequest={this.uploader.bind(this, 2)}
            >
              {moneyCode ? <img src={moneyCode} alt="" /> : uploadButton}
            </Upload>
            <p className={style.uploadTip}><Icon type="cloud-upload" />点击可上传或修改个人收钱码，请确认正确后再上传</p>
          </div>
        </div>
      </div >
    );
  }
}

PersonCenter.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

PersonCenter.defaultProps = {
  user: {},
  dispatch: () => { },
};

function mapStateToProps({ user }) {
  return {
    ...user,
  };
}

export default withRouter(connect(mapStateToProps)(PersonCenter));
