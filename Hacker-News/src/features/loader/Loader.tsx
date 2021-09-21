import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className="data-loader-wrapper">
      <div className={styles['loading']}>
        <p className={styles['label']}>LOADING...</p>
      </div>
    </div>
  );
};
export default Loader;
