import React, { Component } from 'react';


export default class ButtonPannel extends Component {

  render() {
    return (
        <div>
        	<span className="anchor"> Styles: </span>
	        <span className="tab night" onClick={this.props.selectStyle.bind(null,"night")}> Night </span>
	        <span className="tab day" onClick={this.props.selectStyle.bind(null, "day")}> Day </span>
	        <span className="tab australia" onClick={this.props.selectStyle.bind(null, "australia")}> Australian Open </span> 
	        <span className="tab french" onClick={this.props.selectStyle.bind(null, "french")}> French Open </span> 
	        <span className="tab wimbledon" onClick={this.props.selectStyle.bind(null,"wimbledon")}> Wimbledon </span> 
	        <span className="tab usa" onClick={this.props.selectStyle.bind(null,"usa")}> U.S. Open </span> 
        </div>
    );
  }
}


		