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
          const {
            className,
            id,
            imageNode,
            text,
            textClassName,
            url
          } = CourtTypeConfig[court];
          return (
            <CourtTypeTile
              className={className}
              id={id}
              imageNode={imageNode}
              key={id}
              sortPoints={this.sortPoints}
              text={text}
              textClassName={textClassName}
              url={url}
            />
          );
        })}
      </div>
    );
  }
}

Key.propTypes = {
  sortPoints: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired
};
