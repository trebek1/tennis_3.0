import React, { Component } from 'react';

export default class CourtList extends Component {
	
	
    render() {	

    	var url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
    	return(
    		<div>
    			<span id="key"> Map Key</span>
				<div className="ib"><span className="keyValue"><img src={url + "F8EC3B"} /></span><span className="keyValue leftSpace">Tennis Club</span></div>
				<div className="ib"><span className="keyValue"><img src={url + "3BF83E"} /></span><span className="keyValue leftSpace"> Public Tennis Court</span></div>
				<div className="ib"><span className="keyValue"><img src={url + "FE7569"}/></span><span className="keyValue leftSpace"> Tennis Shop</span></div>
				<div className="ib"><span className="keyValue"><img src={url + "00ccff"} /></span><span className="keyValue leftSpace"> Other Facility</span></div>	
    		</div>
    	) 	
  	}
}


		


