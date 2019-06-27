/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Badge } from 'antd';
import { Link } from 'dva/router';
import menu from 'config/menu.config';
import IconFont from '../Iconfont/Iconfont';

export interface MenusProps {
  isSiderFold: boolean
  location: any
  unHandledCount: number
}

const getMenus = function (menuArray, isSiderFold, parentPath = '/', unHandledCount = 0) {
  const menuArr = [];
  menuArray.map((item) => {
    const linkTo = parentPath + item.key;
    const subMenus = getMenus(item.child || [], isSiderFold, `${linkTo}/`);

    if (subMenus && subMenus.length > 0) {
      const subMenu = (
        <Menu.SubMenu
          key={linkTo}
          title={
            <span>
              {item.icon ? <IconFont type={item.icon} /> : ''}
              {isSiderFold && item.name}
              {item.key === 'approval' && <Badge count={unHandledCount} />}
            </span>}
        >
          {subMenus}
        </Menu.SubMenu>
      );
      menuArr.push(subMenu);
    } else {
      menuArr.push(
        <Menu.Item key={linkTo}>
          {item.isRoute ?
            <Link to={linkTo}>
              {item.icon ? <IconFont type={item.icon} /> : ''}
              {!isSiderFold && item.name}
              {item.key === 'approval' ? <Badge style={{ background: '#00ADB5', marginLeft: 8, boxShadow: 'none' }} count={unHandledCount} /> : null}
            </Link> :
            <a href={`#${item.key}`}>
              {item.icon ? <IconFont type={item.icon} /> : ''}
              {!isSiderFold && item.name}
            </a>}
        </Menu.Item>
      );
    }
  });

  return menuArr;
};

function Menus({ isSiderFold, location, unHandledCount }: MenusProps) {
  const { pathname } = location;
  const menuSource = pathname.split('/')[1];
  const menuItems = getMenus(menu[menuSource], isSiderFold, `/${menuSource}/`, unHandledCount);
  const activeIndex = menuItems.findIndex(v => v.key === pathname.substr(0, pathname.length - 1));

  return (
    <Menu
      mode={isSiderFold ? 'vertical' : 'inline'}
      theme="dark"
      defaultSelectedKeys={[menuItems[activeIndex > 0 ? activeIndex : 0].key]}
    >
      {menuItems}
    </Menu>
  );
}

Menus.propTypes = {
  isSiderFold: PropTypes.bool,
  location: PropTypes.object,
  unHandledCount: PropTypes.number,
};

Menus.defaultProps = {
  isSiderFold: false,
  location: {},
  unHandledCount: 0,
};

export default Menus;
