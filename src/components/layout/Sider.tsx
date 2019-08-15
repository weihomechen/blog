import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.less';
import config from 'config/project.config';
import Menus from './Menu';
import {
  DispatchParam,
} from '../../utils/type';

export interface SiderProps {
  isSiderFold: boolean;
  location: object;
  dispatch: (val: DispatchParam) => void;
  unHandledCount: number;
}

class Sider extends React.PureComponent<SiderProps, {}> {
  static propTypes = {
    isSiderFold: PropTypes.bool,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    unHandledCount: PropTypes.number,
  };

  static defaultProps = {
    isSiderFold: false,
    location: {},
    dispatch: () => { },
    unHandledCount: 0,
  };

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

export default Sider;
