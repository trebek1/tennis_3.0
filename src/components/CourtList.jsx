import React, { Component } from 'react';

export default class CourtList extends Component {

	constructor(props){
		super(props);
		this.clickFunction = this.clickFunction.bind(this); 
	}

	clickFunction(index){
		console.log("this is index ", index);
	}
	
	renderList(){
		var courts = this.props.courts; 
		var _this = this; 
		 return (<ul id="courtList">
		 		{courts.map(function(court, index){
			return <li onClick={_this.clickFunction.bind(null, index)} className="courtListItem" key={index}> {court.Name} </li>
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


		