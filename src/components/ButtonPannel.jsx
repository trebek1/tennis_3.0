import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previous: 'wimbledon',
      active: 'wimbledon',
    };
  }

  handleClick = (active) => {
    this.props.selectStyle.bind(null, active)();
    this.setState({
      previous: this.state.active,
      active,
    });
  }

  render() {
    if (document.getElementsByClassName(this.state.previous).length > 0) {
      document.getElementsByClassName(this.state.previous)[0].classList.remove('active');
      document.getElementsByClassName(this.state.active)[0].className += ' active';
    }
    return (
      <div id="styleContainer">
        <span className="anchor"> Styles: </span>
        <span className="tab night " onClick={this.handleClick('night')}> Night </span>
        <span className="tab day " onClick={this.handleClick('day')}> Day </span>
        <span className="tab australia " onClick={this.handleClick('australia')}> Australian Open </span>
        <span className="tab french " onClick={this.handleClick('french')}> French Open </span>
        <span className="tab wimbledon " onClick={this.handleClick('wimbledon')}> Wimbledon </span>
        <span className="tab usa " onClick={this.handleClick('usa')}> U.S. Open </span>
      </div>
    );
  }
}

ButtonPannel.propTypes = {
  selectStyle: PropTypes.func.isRequired,
};

