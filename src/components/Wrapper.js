import React from "react";
import { object } from "prop-types";
import Footer from "./Footer";

const Wrapper = ({ children }) => (
  <div className="app-wrapper">
    <div className="content">{children}</div>
    <Footer />
  </div>
);

Wrapper.propTypes = {
  children: object.isRequired
};

export default Wrapper;
