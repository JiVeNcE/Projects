import React from 'react';
import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>Hacker News top stories</h1>
    </header>
  );
};

export default Header;
