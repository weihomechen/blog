import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';
import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import { DraftEditorProps, DraftEditorState } from '../../utils/type'

import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import styles from './index.less';

BraftEditor.use(CodeHighlighter({
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'C-like',
      syntax: 'clike',
    }, {
      name: 'Bash',
      syntax: 'bash'
    }, {
      name: 'JSON',
      syntax: 'json'
    }
  ],
}));

const emptyRaw = `{ blocks: [{ key: '98r8g', text: '', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }], entityMap: {} }`;
const { confirm } = Modal;

class DraftEditor extends React.Component<DraftEditorProps, DraftEditorState> {
  static propTypes = {
    content: PropTypes.string,
    getContent: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    content: BraftEditor.createEditorState(emptyRaw),
    getContent: () => { },
    type: 'article',
  }

  private editorInstance: any;

  save = (type = 1) => {
    const editorState = this.editorInstance.getValue();
    this.props.getContent(editorState.toHTML(), type);
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
    const _window: any = window

    if (_window.previewWindow) {
      _window.previewWindow.close();
    }

    _window.previewWindow = window.open();
    const editorState = this.editorInstance.getValue();
    _window.previewWindow.document.write(editorState.toHTML());
    _window.previewWindow.document.close();

  }

  render() {
    const { content } = this.props;
    const defaultValue = BraftEditor.createEditorState(content);
    const editorProps = {
      height: 500,
      defaultValue,
      lineHeights: [
        1, 1.2, 1.5, 1.75, 2, 3, 4,
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
          <Button className={styles.submitBtn} onClick={() => this.save(0)}>提交</Button>
          <Button className={styles.cancelBtn} onClick={this.cancel}>取消</Button>
        </div>)}
      </div>
    );
  }
}

export default DraftEditor;

