/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import styles from './Editor.less';

const emptyRaw = { blocks: [{ key: '98r8g', text: '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} };
const { confirm } = Modal;
class DraftEditor extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    getContent: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    content: JSON.stringify(emptyRaw),
    getContent: () => { },
    type: 'article',
  }

  save = (type = 1) => {
    const content = JSON.stringify(this.editorInstance.getRawContent());
    this.props.getContent(content, type);
  }

  cancel = () => {
    confirm({
      title: '未提交的更改不会被保存，是否取消并返回？',
      onOk: () => {
        history.back();
      },
    });
  }

  render() {
    const { content } = this.props;
    const initialContent = JSON.parse(content);
    const editorProps = {
      height: 500,
      initialContent,
      lineHeights: [
        '1', '1.2', '1.5', '1.75',
        '2', '3', '4',
      ],
      letterSpacings: [0, 1, 2, 4, 6],
      media: {
        image: true,
        video: false,
        audio: false,
        validateFn: null,
        uploadFn: (param) => {
          const xhr = new XMLHttpRequest();
          const fd = new FormData();
          const errorFn = () => {
            param.error({
              msg: '上传失败',
            });
          };

          fd.append('file', param.file);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              param.success(JSON.parse(xhr.responseText).data);
            }
          };
          xhr.addEventListener('error', errorFn, false);
          xhr.addEventListener('abort', errorFn, false);
          xhr.open('POST', '/blog/api/article/upload');
          xhr.send(fd);
        },
      },
      extendControls: [
        {
          type: 'split',
        },
        {
          type: 'button',
          text: '预览',
          className: 'preview-button',
          onClick: () => {
            const preview = this.editorInstance.getHTMLContent();
            window.open().document.write(preview);
          },
        },
        // {
        //   type: 'dropdown',
        //   text: <span>下拉菜单</span>,
        //   component: <h1 style={{ width: 200, color: '#ffffff', padding: 10, margin: 0 }}>Hello World!</h1>
        // },
        // {
        //   type: 'modal',
        //   text: <span style={{ paddingRight: 10, paddingLeft: 10 }}>弹出菜单</span>,
        //   className: 'modal-button',
        //   modal: {
        //     title: '这是一个弹出框',
        //     showClose: true,
        //     showCancel: true,
        //     showConfirm: true,
        //     confirmable: true,
        //     onConfirm: () => console.log(1),
        //     onCancel: () => console.log(2),
        //     onClose: () => console.log(3),
        //     children: (
        //       <div style={{ width: 480, height: 320, padding: 30 }}>
        //         <span>Hello World！</span>
        //       </div>
        //     ),
        //   },
        // },
      ],
      onChange: this.handleChange,
    };

    return (
      <div className={styles.wrapper}>
        <BraftEditor
          ref={instance => this.editorInstance = instance}
          {...editorProps}
        />
        {this.props.type === 'article' ? (
          <div className={styles.editorFooter}>
            <Button className={styles.submitBtn} onClick={() => this.save(1)} style={{ margin: '16px 24px 0 0' }}>发表</Button>
            <Button className={styles.draftBtn} onClick={() => this.save(0)} style={{ marginTop: 16 }}>保存为草稿</Button>
          </div>
        ) : (<div className={styles.editorFooter}>
          <Button className={styles.submitBtn} onClick={this.save}>提交</Button>
          <Button className={styles.cancelBtn} onClick={this.cancel}>取消</Button>
        </div>)}
      </div>
    );
  }
}

export default DraftEditor;
