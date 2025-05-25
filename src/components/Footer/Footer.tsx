import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <p>Made with love for grannies</p>
      </div>
      <div className={styles.footerColumn}>
        <p>Add your granny&apos;s tips</p>
      </div>
      <div className={styles.footerColumn}>
        <p>Contact</p>
      </div>
    </footer>
  );
};

export default Footer;