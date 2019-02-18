import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CourtList extends Component {
  componentDidUpdate() {
    if (
      this.props.courts.length === 1 &&
      document.getElementById("return") === null
    ) {
      const node = document.createElement("LI");
      node.id = "return";
      node.innerHTML = "Return to Previous Map";
      node.className = "courtListItem";
      node.addEventListener("click", () => {
        this.props.sortPoints(this.props.sort);
        const element = document.getElementById("return");
        element.parentNode.removeChild(element);
      });
      document.getElementById("courtList").appendChild(node);
    }
  }

  render() {
    const { courts, selectPoint } = this.props;
    if (courts != null && courts.length > 0) {
      courts.sort((court, nextCourt) =>
        court.Name.toUpperCase().localeCompare(nextCourt.Name.toUpperCase())
      );
      return (
        <ul id="courtList">
          {courts.map((court, index) => (
            <li
              onClick={() => selectPoint(index)}
              className="courtListItem"
              key={index}
            >
              {court.Name}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }
}

CourtList.propTypes = {
  selectPoint: PropTypes.func.isRequired,
  courts: PropTypes.arrayOf(React.PropTypes.object).isRequired
};
