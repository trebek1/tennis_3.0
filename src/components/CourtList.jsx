import React, { Component } from 'react';

export default class CourtList extends Component {

	constructor(props){
		super(props);
		this.clickFunction = this.clickFunction.bind(this); 
	}

	clickFunction(index){
		if(this.props.courts.length > 1 ){
			this.props.selectPoint(index);	
		}
	}
	
	renderList(){
		var courts = this.props.courts; 
		courts.sort(function(court,nextCourt){
			var a = court.Name.toUpperCase(); 
			var b = nextCourt.Name.toUpperCase(); 
			return a.localeCompare(b);
		});
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

  	componentDidUpdate(){
  		var _this = this;
  		if(this.props.courts.length === 1 && document.getElementById("return") === null){
  			var node = document.createElement("LI");
  			node.id = "return"; 
			node.innerHTML = "Return to Previous Map"; 
			node.className = "courtListItem";
			node.addEventListener("click", function(){
				_this.props.sortPoints(_this.props.sort); 

			var element = document.getElementById("return");
				element.parentNode.removeChild(element);
			}); 
			document.getElementById("courtList").appendChild(node);
  		}
  	}
}


		