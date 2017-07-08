import React, { Component } from 'react';
import {Link} from 'react-router';

// Redux 
import {connect} from 'react-redux'; 
import {bindActionCreators} from "redux";

//Action to dispatch 
import {getCourts} from "../actions/courtActions"; 

// Dumb Components
import Map from "../components/Map.jsx";
import ButtonPannel from "../components/ButtonPannel.jsx";

class App extends Component {
	constructor(props){
		super(props); 
		this.state = {courts: {}}
	}
  render() {
    return (	
      <div>
    		Something Goes here<br/>
    		<Link to="/login">Login</Link> <br/>
    		<Link to="/signup">SignUp</Link> 
        <Map courts={this.props.courts} />
        <ButtonPannel />
    	 </div>
    );
  }
  componentDidMount(){
  	this.props.getCourts(); 
  }
}

function mapStateToProps(state){
  return {
    courts: state.courts.courts.sfcourts
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getCourts: getCourts
		}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 





