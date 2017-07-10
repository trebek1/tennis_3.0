import React, { Component } from 'react';
import {Link} from 'react-router';

// Redux 
import {connect} from 'react-redux'; 
import {bindActionCreators} from "redux";

//Action to dispatch 
import {getCourts, selectStyle, sortPoints, selectPoint, updateSort} from "../actions/courtActions"; 

// Dumb Components
import Map from "../components/Map.jsx";
import ButtonPannel from "../components/ButtonPannel.jsx";
import CourtList from "../components/CourtList.jsx";
import Key from "../components/Key.jsx";

class App extends Component {
	
  render() {
    return (	
      <div id="mainContainer">
        <div id="title"> Tennis Courts in San Francisco </div>
        <div id="sideContainer">
          <CourtList sort={this.props.sort} sortPoints={this.props.sortPoints} selectPoint={this.props.selectPoint} courts={this.props.selectedPoint.length > 0? this.props.selectedPoint:this.props.sortedCourts} />
        </div> 
        <Map courts={this.props.selectedPoint.length > 0? this.props.selectedPoint:this.props.sortedCourts} style={this.props.style} />
        <div id="keyContainer">
          <Key updateSort={this.props.updateSort} sortPoints={this.props.sortPoints} />
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
    courts: state.courts.courts,
    style: state.styles.styles,
    sortedCourts: state.courts.sortedCourts,
    selectedPoint: state.courts.selectedPoint,
    sort: state.courts.sort
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCourts,
    selectStyle,
    sortPoints,
    selectPoint,
    updateSort
		}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 





