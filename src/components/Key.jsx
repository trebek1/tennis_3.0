import React, { Component } from "react";
import PropTypes from "prop-types";
import CourtTypeTile from "./CourtTypeTile";
import CourtTypeConfig from "../constants/courtTypeConfig";

const DEFAULT_SORT = "all";

export default class Key extends Component {
  state = {
    sort: DEFAULT_SORT
  };

  sortPoints = sort => {
    this.props.sortPoints(sort);
    const element = window.document.getElementById("return");
    if (element) {
      element.parentNode.removeChild(element);
    }
    this.props.updateSort(sort);
    this.setState({
      sort
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
              className={`${className} ${
                this.state.sort === id ? "activeSort" : ""
              }`}
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
