import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Wrapper = () => (
  <div className="app-wrapper">
    <Header />
    <div className="content">
      {this.props.children}
    </div>
    <Footer />
  </div>
);

export default Wrapper;
