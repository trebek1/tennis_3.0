import React, { Component } from 'react';

export default class CourtList extends Component {
	
    constructor(props){
        super(props); // only props if you want to access props in constructor 
        this.sortPoints = this.sortPoints.bind(this); 
    }

    sortPoints(type){
        this.props.sortPoints(type);
    }
	
    render() {	

    	var url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

    	return(
    		<div>
    			<span className="anchor keyTitle">Key:</span>
				<div onClick={this.sortPoints.bind(null, "club")}     id="keyClub"     className="key club"><span className="keyValue"><img src={url + "F8EC3B"} /></span><span className="keyValue leftSpace">Tennis Club</span></div>
				<div onClick={this.sortPoints.bind(null, "court")}    id="keyCourt"    className="key court"><span className="keyValue"><img src={url + "3BF83E"} /></span><span className="keyValue leftSpace"> Public Tennis Court</span></div>
				<div onClick={this.sortPoints.bind(null, "shop")}     id="keyShop"     className="key shop"><span className="keyValue"><img src={url + "FE7569"}/></span><span className="keyValue leftSpace"> Tennis Shop</span></div>
				<div onClick={this.sortPoints.bind(null, "other")} id="keyFacility" className="key facility"><span className="keyValue"><img src={url + "00ccff"} /></span><span className="keyValue leftSpace"> Other Facility</span></div>	
    		</div>
    	) 	
  	}
}


		


