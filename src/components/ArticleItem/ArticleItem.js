import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tag } from 'antd';
import moment from 'moment';
import { IconFont } from '../../components';
import style from './ArticleItem.less';

const ArticleItem = ({
  article, cate, onClick, uid,
}) => {
  const {
    title, id, author, updateTime, abstract, comments, tags,
  } = article;
  const showTime = moment(updateTime).format('YYYY-MM-DD HH:mm');
  return (
    <div className={style.articleItem}>
      <div className={style.articleHeader}>
        <span className={style.articleTitle} onClick={onClick.bind(this, id)}>{title}</span>
        <Tag className={style.cateTag} color={cate.color}>{cate.name}</Tag>
        {
          uid === article.uid ? (
            <a href={`/blog/article/edit/${article.id}`}>编辑</a>
          ) : null
        }
      </div>
      <div className={style.articleDesc}>
        <div className={style.articleInfo}>
          <span className={style.infoItem}><IconFont type="person" color="#F38181" />{author}</span>
          <span className={style.infoItem}><IconFont type="time" color="#F38181" />{showTime}</span>
          {+comments ? <span className={style.infoItem}><IconFont type="comment" color="#F38181" />{comments}</span> : null}
        </div>
        {tags ? <div className={style.articleInfo}>
          <div className={style.tags}>
            <IconFont type="tag" color="#F38181" fontSize="20px" />
            {tags.split(',').map(item => <span key={`${id}-${item}`} className={style.tag}>{item}</span>)}
          </div>
        </div> : null}
        {abstract && <div className={style.contentContainer}><Icon type="book" />{abstract}</div>}
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  uid: PropTypes.number,
  article: PropTypes.object,
  cate: PropTypes.object,
  onClick: PropTypes.func,
};

ArticleItem.defaultProps = {
  article: {},
  cate: {},
  onClick: () => { },
  uid: 0,
};

export default ArticleItem;
