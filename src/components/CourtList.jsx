import React, { Component } from 'react';

export default class CourtList extends Component {
	
	renderList(){
		var courts = this.props.courts; 
		 return (<ul id="courtList">
		 		{courts.map(function(court, index){
			return <li className="courtListItem" key={index}> {court.Name} </li>
		})}
		 	</ul>)
	}
    
    render() {
    	if(this.props.courts != undefined && this.props.courts.length > 0){
    		return this.renderList.bind(this)();
    	}else{
    		return null; 	
    	}
    	
  	}
}


		