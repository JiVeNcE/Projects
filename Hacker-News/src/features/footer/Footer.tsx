import React from 'react';
import { COPYRIGHT_TEXT } from '../../constants/common';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <p className={styles['copyright']}>&#169; {COPYRIGHT_TEXT}</p>
    </footer>
  );
};

export default Footer;
