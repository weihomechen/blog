import React from 'react';

export default (props) => {
  const {
    children,
  } = props;

  return (
    <div className="user-layout">
      {children}
    </div>
  );
};
