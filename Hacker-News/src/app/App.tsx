import React from 'react';
import Footer from '../features/footer/Footer';
import HackerItemsList from '../features/hacketItems/HackerItems';
import Header from '../features/header/Header';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <HackerItemsList />
      <Footer />
    </div>
  );
};

export default Layout;
