import React from 'react';
import PropTypes from 'prop-types';
import './iconfont.less';

export interface IconfontProps {
  type: string
  color: string
  fontSize: string
  className: string
}

const Iconfont = (props: IconfontProps) => {
  const {
    type, color, fontSize, className,
  } = props

  return (<svg className={`icon ${className}`} style={{ fontSize }} aria-hidden="true">
    <use style={{ color }} xlinkHref={`#icon-${type}`} />
  </svg>);
};

Iconfont.defaultProps = {
  type: '',
  color: '',
  fontSize: '',
  className: '',
};

Iconfont.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  className: PropTypes.string,
};

export default Iconfont;

