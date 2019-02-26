import React from "react";
import Footer from "./Footer";

const Wrapper = ({ children }) => (
  <div className="app-wrapper">
    <div className="content">{children}</div>
    <Footer />
  </div>
);

Wrapper.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default Wrapper;
