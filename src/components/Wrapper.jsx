import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Wrapper = props => (
  <div className="app-wrapper">
    <Header />
    <div className="content">
      { props.children }
    </div>
    <Footer />
  </div>
);

Wrapper.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default Wrapper;
