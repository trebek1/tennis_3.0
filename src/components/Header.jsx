import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  	render() {
    return (	
        <div className="header">
      		<Link to="/login">Login</Link> <br/>
    		<Link to="/signup">SignUp</Link> 
      	 </div>
    );
  }
}
