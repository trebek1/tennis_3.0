import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CourtList extends Component {
  componentDidUpdate() {
    const that = this;
    if (
      this.props.courts.length === 1 &&
      document.getElementById("return") === null
    ) {
      const node = document.createElement("LI");
      node.id = "return";
      node.innerHTML = "Return to Previous Map";
      node.className = "courtListItem";
      node.addEventListener("click", () => {
        that.props.sortPoints(that.props.sort);
        const element = document.getElementById("return");
        element.parentNode.removeChild(element);
      });
      document.getElementById("courtList").appendChild(node);
    }
  }
  clickFunction = index => {
    if (this.props.courts.length > 1) {
      this.props.selectPoint(index);
    }
  };

  renderList = () => {
    const courts = this.props.courts;
    courts.sort((court, nextCourt) => {
      const a = court.Name.toUpperCase();
      const b = nextCourt.Name.toUpperCase();
      return a.localeCompare(b);
    });
    const that = this;
    return (
      <ul id="courtList">
        {courts.map((court, index) => (
          <li
            onClick={that.clickFunction.bind(null, index)}
            className="courtListItem"
            key={index}
          >
            {" "}
            {court.Name}{" "}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    if (this.props.courts !== undefined && this.props.courts.length > 0) {
      return this.renderList();
    }
    return null;
  }
}

CourtList.propTypes = {
  selectPoint: PropTypes.func.isRequired,
  courts: PropTypes.arrayOf(React.PropTypes.object).isRequired
};
