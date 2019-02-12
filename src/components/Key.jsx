import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Key extends Component {
  constructor(props) {
    super(props); // only props if you want to access props in constructor
    this.state = {
      sort: "all"
    };
  }

  componentDidUpdate() {
    if (window.document.getElementsByClassName("activeSort").length > 0) {
      const sort = window.document.getElementsByClassName("activeSort")[0];
      if (sort.id !== this.state.sort) {
        const newSort = window.document.getElementById(this.state.sort);
        sort.classList.remove("activeSort");
        newSort.className += " activeSort";
      }
    }
  }

  sortPoints = type => {
    this.props.sortPoints(type);
    const element = window.document.getElementById("return");
    if (element) {
      element.parentNode.removeChild(element);
    }
    this.props.updateSort(type);
    this.setState({
      sort: type
    });
  };

  render() {
    const url =
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
    const clubUrl = `${url}F8EC3B`;
    const courtUrl = `${url}3BF83E`;
    const shopUrl = `${url}FE7569`;
    const otherUrl = `${url}00ccff`;
    const allUrl = `${url}F8EC3B`;

    return (
      <div>
        <span className="anchor keyTitle">Sort By Type:</span>
        <div
          onClick={this.sortPoints.bind(null, "club")}
          id="club"
          className="key club"
        >
          <span className="keyValue">
            <img src={clubUrl} alt="club" />
          </span>
          <span className="keyValue leftSpace">Tennis Club</span>
        </div>
        <div
          onClick={this.sortPoints.bind(null, "court")}
          id="court"
          className="key court"
        >
          <span className="keyValue">
            <img src={courtUrl} alt="court" />
          </span>
          <span className="keyValue leftSpace"> Public Tennis Court</span>
        </div>
        <div
          onClick={this.sortPoints.bind(null, "shop")}
          id="shop"
          className="key shop"
        >
          <span className="keyValue">
            <img src={shopUrl} alt="shop" />
          </span>
          <span className="keyValue leftSpace"> Tennis Shop</span>
        </div>
        <div
          onClick={this.sortPoints.bind(null, "other")}
          id="other"
          className="key other"
        >
          <span className="keyValue">
            <img src={otherUrl} alt="other" />
          </span>
          <span className="keyValue leftSpace"> Other Facility</span>
        </div>
        <div
          onClick={this.sortPoints.bind(null, "all")}
          id="all"
          className="key all activeSort"
        >
          <span className="keyValue">
            <img src={allUrl} alt="all" />
          </span>
          <span className="keyValue">
            <img src={courtUrl} alt="courts" />
          </span>
          <span className="keyValue">
            <img src={shopUrl} alt="shop" />
          </span>
          <span className="keyValue">
            <img src={otherUrl} alt="other" />
          </span>
          <span className="keyValue leftSpace">All Locations</span>
        </div>
      </div>
    );
  }
}

Key.propTypes = {
  sortPoints: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired
};
