import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.less';
import config from 'config/project.config';
import Menus from './Menu';

class Sider extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({ type: 'approval/getList' });
  }
  render() {
    const {
      isSiderFold,
      location,
      unHandledCount,
    } = this.props;
    // const menuClick = (e) => {
    //   e.domEvent.preventDefault();
    //   const targetNode = document.getElementById(e.key.replace(/\//g, ''));
    //   targetNode.scrollIntoView(true);
    // }
    const menusProps = {
      isSiderFold,
      location,
      unHandledCount,
      // menuClick,
    };
    return (
      <div className={styles.sider}>
        <div className={styles.logo}>
          <img alt="logo" src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/blog/logo.png" />
          {isSiderFold ? '' : <span>{config.logoText}</span>}
        </div>
        <Menus {...menusProps} />
      </div>
    );
  }
}

Sider.propTypes = {
  isSiderFold: PropTypes.bool,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  unHandledCount: PropTypes.number,
};

Sider.defaultProps = {
  isSiderFold: false,
  location: {},
  dispatch: () => { },
  unHandledCount: 0,
};

export default Sider;
