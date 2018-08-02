import React from 'react';
import PropTypes from 'prop-types';
import './iconfont.less';

const Iconfont = ({
  type, color, fontSize, className,
}) => (
  <svg className={`icon ${className}`} style={{ fontSize }} aria-hidden="true">
    <use style={{ color }} xlinkHref={`#icon-${type}`} />
  </svg>
);

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

