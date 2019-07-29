/* eslint-disable no-unused-expressions,no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Input,
  Spin,
  message,
  Select,
  Tag,
  Icon,
  Tooltip,
  Switch,
  Modal,
} from 'antd';
import { connect } from 'dva';
import { withRouter, Prompt } from 'dva/router';
import Editor from '../../components/editor';
import style from './assets/css/index.less';
import {
  User,
  Article,
  Cate,
} from '../../utils/type'

const labelSpan = 2;
const contentSpan = 16;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

export interface ArticleEditProps {
  match: any
  location: any
  user: User
  loading: boolean
  isEditing: boolean
  article: Article
  cateList: Cate[]
  dispatch: (val: any) => any
}

export interface ArticleEditState {
  inputVisible: boolean
  inputValue: string
}

class ArticleEdit extends Component<ArticleEditProps> {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object,
    loading: PropTypes.bool,
    isEditing: PropTypes.bool,
    article: PropTypes.object,
    cateList: PropTypes.array,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    match: {},
    location: {},
    user: {},
    loading: false,
    isEditing: false,
    article: {},
    cateList: [],
    dispatch: () => { },
  };

  state = {
    inputVisible: false,
    inputValue: '',
  };

  tagInput: any

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;

    id && this.getArticle(id);
    dispatch({ type: 'category/getCateList' }).then(({ success, cateList }) => {
      if (success && !id) {
        const { id } = cateList.find(v => v.name === '其它') || {} as Cate;
        this.props.dispatch({ type: 'article/articleChange', payload: { cate: id } });
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'article/init' });
  }

  handleUnLogin = async (dispatch) => {
    await dispatch({ type: 'article/stateChange', payload: { isEditing: false } });
    message.error('创建文章前请先登录', 1.5, () => dispatch({ type: 'global/routeChange', payload: { path: '/user/login' } }));
  }

  getArticle = (id) => {
    this.props.dispatch({ type: 'article/getArticle', payload: { id } });
  }

  titleChange = (e) => {
    const title = e.target.value;
    this.props.dispatch({ type: 'article/articleChange', payload: { title } });
  }

  abstractChange = (e) => {
    const abstract = e.target.value;
    this.props.dispatch({ type: 'article/articleChange', payload: { abstract } });
  }

  cateChange = (cate) => {
    this.props.dispatch({ type: 'article/articleChange', payload: { cate } });
  }

  getContent = (content, status) => {
    const { user, dispatch } = this.props;
    if (!user.uid) {
      this.handleUnLogin(dispatch);
    }

    const { title, abstract } = this.props.article;

    if (!title || title.length > 50) {
      message.error('请输入50个字符内的标题');
      return;
    }

    if (abstract.length > 100) {
      message.error('请输入100个字符内的摘要');
      return;
    }

    dispatch({
      type: 'article/saveArticle',
      payload: { content, status },
    }).then(({ success, msg }) => {
      if (success) {
        message.success('保存文章成功', 1, () => dispatch({ type: 'global/routeChange', payload: { path: '/' } }));
      } else {
        message.error(msg);
      }
    });
  }

  leaveHandler = (nextLocation) => {
    const { location } = this.props;
    return nextLocation.pathname === location.pathname ? false : '文章还未保存，是否离开当前页面？';
  }

  handleClose = (removedTag) => {
    const { article = {} as Article, dispatch } = this.props;
    const tagsArr = article.tags.split(',').filter(tag => tag !== removedTag);
    const tags = tagsArr.join(',');

    dispatch({ type: 'article/articleChange', payload: { tags } });
  }

  showInput = () => {
    const { tags } = this.props.article;
    const tagsArr = tags ? tags.split(',') : [];

    if (tagsArr.length > 2) {
      message.info('一篇文章不可以超过3个标签哦～');
      return;
    }

    this.setState({ inputVisible: true }, () => this.tagInput.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state;

    if (inputValue.length > 10) {
      message.error('请输入10个字符内的标签');
      return;
    }

    const { article = {} as Article, dispatch } = this.props;
    const { tags } = article;
    let tagsArr = tags ? tags.split(',') : [];

    if (inputValue && tagsArr.indexOf(inputValue) === -1) {
      tagsArr = [...tagsArr, inputValue];
    }

    dispatch({ type: 'article/articleChange', payload: { tags: tagsArr.join(',') } });

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }

  acceptRewardChange = (checked) => {
    const handler = () => {
      const isAcceptReward = +checked;
      this.props.dispatch({ type: 'article/articleChange', payload: { isAcceptReward } });
    };

    if (checked) {
      confirm({
        title: '原创不易，建议只有原创或享有版权的文章才开启打赏功能，是否开启?',
        content: 'Tip: 只有在个人中心设置了收钱码才能使用收钱功能',
        onOk: () => {
          handler();
        },
        onCancel: () => {
          checked = false;
          handler();
        },
      });
    } else {
      handler();
    }
  }

  render() {
    const { loading, isEditing, cateList, article, match } = this.props;
    const { id } = match.params;
    const { title, abstract, content, cate, tags = '', isAcceptReward } = article;
    const tagsArr = tags ? tags.split(',') : [];
    const { inputValue, inputVisible } = this.state;

    return (
      <div className={style.articleEditPage}>
        <Spin className={style.spin} spinning={loading} />
        <div>
          <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
            <Col span={labelSpan}>文章标题</Col>
            <Col span={contentSpan}><Input value={title} onChange={this.titleChange} /></Col>
          </Row>
          <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
            <Col span={labelSpan}>文章摘要</Col>
            <Col span={contentSpan}><TextArea autosize={{ minRows: 2, maxRows: 3 }} value={abstract} onChange={this.abstractChange} /></Col>
          </Row>
          <Row type="flex" align="middle" style={{ margin: '8px 0' }}>
            <Col span={labelSpan}>选择分类</Col>
            <Col span={6}>
              <Select value={cate} onChange={this.cateChange} style={{ width: 200 }}>
                {cateList.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>))}
              </Select>
            </Col>
            <Col span={1}>标签</Col>
            <Col span={11}>
              <div className={style.tagsContainer}>
                {tagsArr.map(tag => {
                  const isLongTag = tag.length > 6;
                  const tagElem = (
                    <Tag key={tag} closable color="#00adb5" afterClose={() => this.handleClose(tag)}>
                      {isLongTag ? `${tag.slice(0, 6)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                  <Input
                    ref={input => this.tagInput = input}
                    type="text"
                    size="small"
                    style={{ width: 90 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}><Icon type="plus" /> 新标签</Tag>
                )}
              </div>
            </Col>
            <Col span={3}>
              开启打赏：
              <Switch
                checked={!!isAcceptReward}
                onChange={this.acceptRewardChange}
              />
            </Col>
          </Row>
        </div>
        <div className={style.articleEditer}>
          {!id || content ? <Editor getContent={this.getContent} content={content} /> : null}
        </div>
        <Prompt
          when={isEditing}
          message={this.leaveHandler}
        />
      </div>
    );
  }
}

function mapStateToProps({ loading, article, user, category = {} as any }) {
  return {
    loading: loading.models.article,
    user: user.user,
    cateList: category.cateList,
    ...article,
  };
}

export default withRouter(connect(mapStateToProps)(ArticleEdit));
