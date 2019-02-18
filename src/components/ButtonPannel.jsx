import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonPannelConfig from "../constants/buttonPannelConfig";

export default class ButtonPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: "wimbledon",
      active: "wimbledon"
    };
  }

  handleClick = active => {
    const { selectStyle } = this.props;
    selectStyle(active);
    this.setState({
      previous: this.state.active,
      active
    });
  };

  render() {
    if (document.getElementsByClassName(this.state.previous).length > 0) {
      document
        .getElementsByClassName(this.state.previous)[0]
        .classList.remove("active");
      document.getElementsByClassName(this.state.active)[0].className +=
        " active";
    }
    return (
      <div id="styleContainer">
        <span className="anchor"> Styles: </span>
        {Object.keys(ButtonPannelConfig).map(button => {
          const config = ButtonPannelConfig[button];
          return (
            <span
              className={config.className}
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
