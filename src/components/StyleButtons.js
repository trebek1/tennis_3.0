import React, { Component } from "react";
import { func } from "prop-types";
import ButtonPannelConfig from "../constants/buttonPannelConfig";
import StyleButton from "./StyleButton";

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
            <StyleButton
              active={active}
              className={className}
              clickText={clickText}
              handleClick={this.handleClick}
              key={text}
              text={text}
            />
          );
        })}
      </div>
    );
  }
}

StyleButtons.propTypes = {
  selectStyle: func.isRequired
};
