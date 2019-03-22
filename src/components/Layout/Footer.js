import React from 'react';
import styles from './Footer.less';
import config from 'config/project.config'

const Footer = () => (
  <div className={styles.footer}>
    {config.footerText}
  </div>
);

export default Footer;

