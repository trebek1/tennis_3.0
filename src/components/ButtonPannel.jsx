import React, { Component } from 'react';


export default class ButtonPannel extends Component {

  render() {
    return (
        <ul>
          <li onClick={this.props.selectStyle.bind(null,"night")}>Night</li>
          <li onClick={this.props.selectStyle.bind(null, "day")}>Day</li>
          <li onClick={this.props.selectStyle.bind(null, "australia")}>Australian Open</li> 
          <li onClick={this.props.selectStyle.bind(null, "french")}>French Open</li> 
          <li onClick={this.props.selectStyle.bind(null,"wimbledon")}>Wimbledon</li> 
          <li onClick={this.props.selectStyle.bind(null,"usa")}>U.S. Open</li> 
        </ul>
    );
  }
}


		