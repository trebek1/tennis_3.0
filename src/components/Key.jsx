import React, { Component } from 'react';

export default class CourtList extends Component {
	
	
    render() {	

    	var url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
    	
    	return(
    		<div>
    			<span id="key"> Map Key</span>
				<div id="keyClub"     className="ib club"><span className="keyValue"><img src={url + "F8EC3B"} /></span><span className="keyValue leftSpace">Tennis Club</span></div>
				<div id="keyCourt"    className="ib court"><span className="keyValue"><img src={url + "3BF83E"} /></span><span className="keyValue leftSpace"> Public Tennis Court</span></div>
				<div id="keyShop"     className="ib shop"><span className="keyValue"><img src={url + "FE7569"}/></span><span className="keyValue leftSpace"> Tennis Shop</span></div>
				<div id="keyFacility" className="ib facility"><span className="keyValue"><img src={url + "00ccff"} /></span><span className="keyValue leftSpace"> Other Facility</span></div>	
    		</div>
    	) 	
  	}
}


		


