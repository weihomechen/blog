/* eslint-disable no-unused-expressions, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';
import BraftEditor, { EditorState } from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import styles from './Editor.less';

BraftEditor.use(CodeHighlighter({
  includeEditors: ['editor-with-code-highlighter'],
}));

const emptyRaw = `{ blocks: [{ key: '98r8g', text: '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} }`;
const { confirm } = Modal;
class DraftEditor extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    getContent: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    content: EditorState.createFrom(emptyRaw),
    getContent: () => { },
    type: 'article',
  }

  save = (type = 1) => {
    const editorState = this.editorInstance.getValue();
    this.props.getContent(editorState.toHtml(), type);
  }

  cancel = () => {
    confirm({
      title: '未提交的更改不会被保存，是否取消并返回？',
      onOk: () => {
        history.back();
      },
    });
  }

  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    const editorState = this.editorInstance.getValue();
    window.previewWindow.document.write(editorState.toHTML());
    window.previewWindow.document.close();

  }

  render() {
    const { content } = this.props;
    const editorProps = {
      height: 500,
      defaultValue: EditorState.createFrom(content),
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
          key: 'custom-button',
          type: 'button',
          text: '预览',
          onClick: this.preview
        },
      ],
    };

    return (
      <div className={styles.wrapper}>
        <BraftEditor
          id="editor-with-code-highlighter"
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
