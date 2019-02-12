import React from "react";
import Footer from "./Footer";

const Wrapper = props => (
  <div className="app-wrapper">
    <div className="content">{props.children}</div>
    <Footer />
  </div>
);

Wrapper.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default Wrapper;
