import React, { Component } from "react";
import { func } from "prop-types";
import ButtonPannelConfig from "../constants/buttonPannelConfig";

const DEFAULT_ACTIVE = "wimbledon";

export default class StyleButtons extends Component {
  state = {
    active: DEFAULT_ACTIVE
  };

  handleClick = active => {
    this.props.selectStyle(active);
    this.setState({
      active
    });
  };

  render() {
    const { active } = this.state;
    return (
      <div id="styleContainer">
        <span className="anchor">Styles:</span>
        {Object.keys(ButtonPannelConfig).map(button => {
          const { className, clickText, text } = ButtonPannelConfig[button];
          return (
            <span
              className={`${className} ${clickText === active ? "active" : ""}`}
              key={text}
              onClick={() => this.handleClick(clickText)}
            >
              {text}
            </span>
          );
        })}
      </div>
    );
  }
}

StyleButtons.propTypes = {
  selectStyle: func.isRequired
};
