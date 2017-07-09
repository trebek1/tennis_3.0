import React, { Component } from 'react';

class Map extends Component {

	constructor(props){
		super(props); 
		this.state = {
			courts: [],
			expanded: false,
			style: "night"
		}
		this.createLegend = this.createLegend.bind(this);
		this.legend = this.legend.bind(this);  
		this.getCourts = this.getCourts.bind(this);
		this.createMap = this.createMap.bind(this); 
		this.getPoints = this.getPoints.bind(this);
		this.getPinColor = this.getPinColor.bind(this);
		this.createMarker = this.createMarker.bind(this); 
		this.setMarkerContent = this.setMarkerContent.bind(this);
		this.setMarkerDataToState = this.setMarkerDataToState.bind(this);
		this.chooseStyles = this.chooseStyles.bind(this); 
	};

	chooseStyles(){
		var styles; 

		switch(this.state.style){
			case "day":
				styles = []; 
				return styles; 
			case "night": 
				styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
				return styles;
			case "wimbledon": 
				styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#fffafa"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#fff8f8"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#fcfcfc"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"lightness":"-8"},{"gamma":"1.16"},{"weight":"0.01"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"17"},{"hue":"#9600ff"},{"gamma":"1.02"},{"weight":"2.19"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#6400ff"},{"lightness":"51"},{"gamma":"0.90"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"hue":"#ff8200"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#255f2e"},{"lightness":17}]}];
				return styles; 
			case "australia":
				styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#fffafa"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#fff8f8"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#fcfcfc"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"},{"lightness":"-8"},{"gamma":"1.16"},{"weight":"0.01"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":"-47"},{"hue":"#ffc800"},{"gamma":"1.02"},{"weight":"1.48"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#884614"},{"lightness":"41"},{"gamma":"0.90"},{"weight":"1.64"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"lightness":"0"},{"saturation":"0"},{"weight":"0.93"},{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#3188ac"},{"lightness":17}]}];
				return styles;
			case "french":
				styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#e08a22"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"color":"#907272"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#53856f"},{"visibility":"on"}]}];
				return styles;
			case "usa":
				styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#2157bc"},{"lightness":"13"},{"gamma":"1"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"color":"#fcf5f5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#4eba70"},{"saturation":"25"},{"lightness":"12"},{"gamma":"0.69"},{"weight":"0.45"}]}];
				return styles;
			default: 
				styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
				return styles;
		}
	}

	//Removed Legend from the map itself 
	createLegend(map){
		
	// 	var legendDiv = document.createElement('div');
	// 	var legend = this.legend(legendDiv, map);
 	//  legendDiv.style.color = "orange";
 	//  legendDiv.index = 1;
 	//  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);   
	};

	getCourts(){
		if(this.props.courts.length > this.state.courts.length){
  			this.setState({
  				courts: this.props.courts
  			});
  		}
	};

	createMap(){

		var styles = this.chooseStyles(); 
		var bounds = new google.maps.LatLngBounds();  
		var mapOptions = {
            center: new google.maps.LatLng(37.763108, -122.455799),
            zoom: 13,
            styles: styles,
            bounds: bounds
        };
	    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	    this.setState({
	    	map: map
	    });

	    return map; 
	};

	getPoints(){
		var points = []; 
		var courts = this.state.courts;

		for(var i = 0; i<courts.length; i++){
    		var temp = [courts[i].X,courts[i].Y]
    		var a = new google.maps.LatLng(temp[0],temp[1]);
    		points.push(a);
    	}
    	return points;   
	};

	getPinColor(data){
		var courtType = data.Type.toLowerCase();
        
        if(courtType === 'shop'){
            return "FE7569"
        }else if(courtType === 'club'){
            return "F8EC3B"
        }else if (courtType === 'court'){
            return "3BF83E"
        }else if (courtType === 'other'){
            return "00ccff"
        }else{
            return "FE7569"
        }
	};

	createMarker(map, points, index){
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.getPinColor(this.state.courts[index]),
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
          new google.maps.Size(40, 37),
          new google.maps.Point(0, 0),
          new google.maps.Point(12, 35));
		var marker = new google.maps.Marker({
			position: points[index],
      		icon: pinImage,
      		shadow: pinShadow,
			map: map
		});
		return marker; 
	};

	setMarkerDataToState(index){

		var type = this.state.courts[index].Type.toLowerCase();
		var courts = this.state.courts;

        this.setState({
          name: courts[index].Name,
          address: courts[index].Address,
          phone: courts[index].Phone,
          xcoord: courts[index].X,
          ycoord: courts[index].Y,
          lights: courts[index].Lights,
          type: courts[index].Type,
          wall: courts[index].Wall,
          grass: courts[index].Grass,
          proShop: courts[index].ProShop,
          courtNumber: courts[index].Courts,
          clay: courts[index].Clay,
          indoor: courts[index].Indoor,
          string: courts[index].Stringing,
          //mini: <MiniMap xcoord = {courts[index].xcoord} ycoord = {courts[index].ycoord}/>, 
          expanded: true
        }); 
	};

	setMarkerContent(index){

		var type = this.state.courts[index].Type.toLowerCase();
		var court = this.state.courts[index];
		var contentString = 
		'<div id="content">' +
			'<div> Name: ' + court.Name + ' </div>' +
			'<div> Address: ' + court.Address + 
		'</div>';
		
        // Create new info window - Popup with street location and the title of the movie 
        var infowindow = new google.maps.InfoWindow({
          	content: contentString
        }, {passive: true});

    return infowindow; 
        
	};

	legend(controlDiv, map) {
	    // Set CSS styles for the DIV containing the control
	    // Setting padding to 5 px will offset the control
	    // from the edge of the map
	    controlDiv.style.padding = '5px';

	    // Set CSS for the control border
	    var controlUI = document.createElement('DIV');
	    controlUI.style.backgroundColor = 'black';
	    controlUI.style.borderStyle = 'solid';
	    controlUI.style.borderWidth = '1px';
	    controlUI.title = 'Legend';
	    controlDiv.appendChild(controlUI);

	    // Set CSS for the control text
	    var controlText = document.createElement('DIV');
	    controlText.style.fontFamily = 'Arial,sans-serif';
	    controlText.style.fontSize = '12px';
	    controlText.style.paddingLeft = '4px';
	    controlText.style.paddingRight = '4px';
	  
	    // Add the text
	    controlText.innerHTML = '<div id="legendContainer"><div id="key"> Map Key</div>' +
	    '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B" /></span><span class="keyValue leftSpace">Tennis Club</span></div>' +
	    '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E" /></span><span class="keyValue leftSpace"> Public Tennis Court</span></div>' +
	    '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"/></span><span class="keyValue leftSpace"> Tennis Shop</span></div>' +
	    '<div><span class="keyValue"><img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff" /></span><span class="keyValue leftSpace"> Other Facility</span></div></div>';
	    
	    controlUI.appendChild(controlText); 
	};

	//Lifecycle Methods

	shouldComponentUpdate(nextProps, nextState) {	
		if(this.state.courts.length === 0){
			this.setState({
				courts: this.props.courts
			});
			return true;
		}else if(this.state.style != nextProps.style){
			this.setState({
				style: nextProps.style
			});
			return true;
		}else if(nextProps.courts.length != this.state.courts.length){
			this.setState({
				courts: nextProps.courts
			});
			return true;
		}else{
			return false;
		}
	};
	
  	render(){
  		return <div id="mapContainer">
  				<div id="map" className="map-gic main-map" ref="gmap"> Map Loading </div>
  			</div>
  	};

  	componentDidUpdate(){
  		if(this.state.courts.length === 0){
  			this.getCourts();	
  		}
  		
  		if(this.state.courts.length > 0){
  			
	        var courts; 
	        var _this = this; 
	        var map = this.createMap();
	        var bounds = map.getBounds();	        
			var points = this.getPoints();

        	for(var j=0; j<points.length; j++){
	            (function(j){
	          		
	          		// get marker and infowindow variables from functions
	                var marker = _this.createMarker(map,points,j);
	        		var infowindow = _this.setMarkerContent(j); 
	        		
	        		//set bounds and set center of map 
	        		bounds.extend(marker.getPosition());
	        		map.setCenter(bounds.getCenter());

	        		//Handle clicking marker 
		        	google.maps.event.addListener(marker, 'click', function() {
		        	
			        	//If not expended then expand the window
		              	if(_this.state.expanded === false){
		              		
		              		//Expand window
		                	infowindow.open(map,this); 

		                	//Add window and marker to state
			                _this.setState({
			                	infowindow: infowindow,
			                	marker: marker
			                });     
		              
		              	//Set data to state for court 
		              	_this.setMarkerDataToState(j); 
		              
		                }else{
		                	
		                	// if expanded window we have to close the window and open another
			              	_this.state.infowindow.close(map,_this.state.marker); 
			              	infowindow.open(map,marker);
			              	
			              	// put new window and marker on state 
			              	 _this.setState({
			                	infowindow: infowindow,
			                	marker: marker
			                });     
			              	 //Set rest of data to state
			              	_this.setMarkerDataToState(j); 

		                }
	            	}, {passive: false});
		         })(j);
	  		}

	  		//Add listener to map so that if its clicked then the window closes if its open
	  		google.maps.event.addListener(map,'click',function(){
	           	if(_this.state.infowindow){
	           		_this.state.infowindow.close(_this.state.map,_this.state.marker); 
		           	_this.setState({
		           		expanded: false,
		           		infowindow: null
		           	});
	           	}
	            }, {passive: true}); 

	  		//Create the map legend! 
	  		//this.createLegend(map);
	  	
	  		// Todo this implementation is not very good
  			//switch(_this.state.style){
			// 	case "day":
			// 		document.getElementById("legendContainer").style["background-color"] = "white";
			// 		return;
			// 	case "night": 
			// 		document.getElementById("legendContainer").style["background-color"] = "black";
			// 		return; 
			// 	case "wimbledon": 
			// 		document.getElementById("legendContainer").style["background-color"] = "purple";
			// 		return;
			// 	case "australia":
			// 		document.getElementById("legendContainer").style["background-color"] = "green";
			// 		return;
			// 	case "french":
			// 		document.getElementById("legendContainer").style["background-color"] = "orange";
			// 		return; 
			// 	case "usa":
			// 		document.getElementById("legendContainer").style["background-color"] = "blue";
			// 		return;
			// 	default: 
			// }	
  		

		}
  	};
}

export default Map


