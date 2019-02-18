import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonPannelConfig from "../constants/buttonPannelConfig";

const DEFAULT_ACTIVE = "wimbledon";
const DEFAULT_PREVIOUS = "wimbledon";

export default class ButtonPannel extends Component {
  state = {
    previous: DEFAULT_PREVIOUS,
    active: DEFAULT_ACTIVE
  };

  handleClick = active => {
    const { selectStyle } = this.props;
    selectStyle(active);
    this.setState({
      previous: this.state.active,
      active
    });
  };

  render() {
    const { active } = this.state;
    return (
      <div id="styleContainer">
        <span className="anchor"> Styles: </span>
        {Object.keys(ButtonPannelConfig).map(button => {
          const config = ButtonPannelConfig[button];
          return (
            <span
              className={`${config.className} ${
                config.clickText === active ? "active" : ""
              }`}
              key={config.text}
              onClick={() => this.handleClick(config.clickText)}
            >
              {config.text}
            </span>
          );
        })}
      </div>
    );
  }
}

ButtonPannel.propTypes = {
  selectStyle: PropTypes.func.isRequired
};
