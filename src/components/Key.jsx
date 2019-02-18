import React, { Component } from "react";
import PropTypes from "prop-types";
import CourtTypeTile from "./CourtTypeTile";
import CourtTypeConfig from "../constants/courtTypeConfig";

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
    return (
      <div>
        <span className="anchor keyTitle">Sort By Type:</span>

        {Object.keys(CourtTypeConfig).map(court => {
          const { className, id, text, textClassName, url } = CourtTypeConfig[
            court
          ];
          return (
            <CourtTypeTile
              className={className}
              id={id}
              key={id}
              sortPoints={this.sortPoints}
              text={text}
              textClassName={textClassName}
              url={url}
            />
          );
        })}
        <div
          onClick={() => this.sortPoints("all")}
          id="all"
          className="key all activeSort"
        >
          <span className="keyValue">
            <img
              src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B"
              alt="all"
            />
            <img
              src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E"
              alt="all"
            />
            <img
              src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"
              alt="all"
            />
            <img
              src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff"
              alt="all"
            />
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
