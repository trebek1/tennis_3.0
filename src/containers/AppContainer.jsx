import React, { Component } from 'react';
import {Link} from 'react-router';

// Redux 
import {connect} from 'react-redux'; 
import {bindActionCreators} from "redux";

//Action to dispatch 
import {getCourts, selectStyle} from "../actions/courtActions"; 

// Dumb Components
import Map from "../components/Map.jsx";
import ButtonPannel from "../components/ButtonPannel.jsx";
import CourtList from "../components/CourtList.jsx";
import Key from "../components/Key.jsx";

class App extends Component {
	constructor(props){
		super(props); 
		this.state = {courts: []}
	}
  render() {
    return (	
      <div id="mainContainer">
        <div id="title"> Tennis Courts in San Francisco </div>
        <div id="sideContainer">
          <CourtList courts={this.props.courts} />
        </div> 
        <Map courts={this.props.courts} style={this.props.style} />
        <div id="keyContainer">
          <Key />
         </div> 
        <div id="styleSelectorContainer">
          <ButtonPannel selectStyle={this.props.selectStyle} />
        </div>
    	</div>
    );
  }
  componentDidMount(){
  	this.props.getCourts(); 
  }
}

function mapStateToProps(state){
  return {
    courts: state.courts.courts.sfcourts,
    style: state.styles.styles
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCourts: getCourts,
    selectStyle: selectStyle
		}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 





