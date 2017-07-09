import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Header extends Component {
  	render() {
    return (	
        <div className="header padding">
      		<span className="padding headerLink"><Link style={{ textDecoration: 'none' }} to="/login">Login</Link></span> <span className="padding headerLink"><Link style={{ textDecoration: 'none' }} to="/signup">SignUp</Link> </span>
      	 </div>
    );
  }
}
