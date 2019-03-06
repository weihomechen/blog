import React from 'react';
import Button from '@material-ui/core/Button';
import { IconFont } from 'components';
import styles from './assets/css/index.less';

const goBack = () => {
  history.go(-2)
}

const Error = () => (
  <div className={styles.errorPage}>
    <div className={styles.error}>
      <IconFont type="404" fontSize="350px" />
      <div className={styles.tip}>您要访问的页面已不在服务区</div>
      <div className={styles.btnContainer}>
        <Button
          onClick={goBack}
          className={styles.reloadBtn}
          variant="raised"
        >
          返回上一页
        <IconFont type="reload" fontSize="16px" />
        </Button>
        <Button className={styles.linkBtn} variant="raised">
          <a href="/blog">返回首页</a>
          <IconFont type="home" fontSize="16px" color="#fff" />
        </Button>
      </div>
    </div>
  </div>
);

export default Error;
