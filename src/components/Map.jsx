import React, { Component } from 'react';

class Map extends Component {

	constructor(props){
		super(props); 
		this.state = {
			courts: [],
			expanded: false
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
	}

	createLegend(map){
		
		var legendDiv = document.createElement('div');
		var legend = this.legend(legendDiv, map);
        
        legendDiv.style.color = "orange";
        
        legendDiv.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legendDiv);   
	}

	getCourts(){

		if(this.props.courts.length > this.state.courts.length){
  			this.setState({
  				courts: this.props.courts
  			});
  		}

	}

	createMap(){

		var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
		var bounds = new google.maps.LatLngBounds();  
		var mapOptions = {
            center: new google.maps.LatLng(37.763108, -122.455799),
            zoom: 13,
            styles: styles,
            bounds: bounds
        };
	    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	    return map; 
	}

	getPoints(){

		var points = []; 
		var courts = this.state.courts;

		for(var i = 0; i<courts.length; i++){
    		var temp = [courts[i].xcoord,courts[i].ycoord]
    		var a = new google.maps.LatLng(temp[0],temp[1]);
    		points.push(a);
    	}

    	return points;   
	}

	getPinColor(data){
		var courtType = data.type.toLowerCase();
        
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
	}

	createMarker(map, points, index){
		var _this = this; 
		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + _this.getPinColor(_this.state.courts[index]),
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
	}

	setMarkerDataToState(index){

		var type = this.state.courts[index].type.toLowerCase();
		var courts = this.state.courts;

          
          if(type === 'shop'){
            _this.setState({
              name: courts[index].name,
              address: courts[index].address,
              phone: courts[index].phone,
              xcoord: courts[index].xcoord,
              ycoord: courts[index].ycoord,
              type: courts[index].type,
             // mini: <MiniMap xcoord = {courts[index].xcoord} ycoord = {courts[index].ycoord} />, 
              expanded: true
            });   
          }else if(type === 'club'){
            _this.setState({
              name: courts[index].ClubName,
              address: courts[index].ClubAddress,
              phone: courts[index].ClubPhone,
              xcoord: courts[index].xcoord,
              ycoord: courts[index].ycoord,
              lights: courts[index].ClubLights,
              type: courts[index].type,
              wall: courts[index].ClubWall,
              grass: courts[index].ClubGrass,
              proShop: courts[index].ClubProShop,
              courtNumber: courts[index].ClubCourts,
              clay: courts[index].ClubClay,
              indoor: courts[index].ClubIndoor,
              string: courts[index].ClubStringing,
              //mini: <MiniMap xcoord = {courts[index].xcoord} ycoord = {courts[index].ycoord}/>, 
              expanded: true
            }); 
          
          }else if(type === "court" || type === 'other'){
            
            _this.setState({
              name: courts[index].CourtName,
              address: courts[index].Address,
              xcoord: courts[index].xcoord,
              ycoord: courts[index].ycoord,
              lights: courts[index].Lights,
              type: courts[index].type,
              //mini: <MiniMap xcoord = {courts[index].xcoord} ycoord = {courts[index].ycoord}/>, 
              expanded: true   
            });   
          }else{
            // _this.setState({
            //   name: "An error has occured",
            //   expanded: true
            // }); 
          }

	}

	setMarkerContent(index){

		var type = this.state.courts[index].type.toLowerCase();
		var contentString;
		
		if(type === "club"){
			contentString = '<div id="content"><font color = "orange">'+ this.state.courts[index].ClubName +  
        '<br/>'+
        '<br/>'+
        'Address: ' + this.state.courts[index].ClubAddress
        '</font>'+
        '</div>';
		}else if(type === "shop"){
			contentString = '<div id="content"><font color = "orange">'+ this.state.courts[index].name +  
        '<br/>'+
        '<br/>'+
        'Address: ' + this.state.courts[index].address 
        '</font>'+
        '</div>';
		}else{
			contentString = '<div id="content"><font color = "orange">'+ this.state.courts[index].CourtName +  
        '<br/>'+
        '<br/>'+
        'Address: ' + this.state.courts[index].Address 
        '</font>'+
        '</div>';
		}
			
        // Create new info window - Popup with street location and the title of the movie 
          var infowindow = new google.maps.InfoWindow({
          content: contentString
          }, {passive: true});

          return infowindow; 
        
	}



	// componentWillReceiveProps(nextProps) {
	// 	if(nextProps.length > 0){
	// 		this.setState({
	// 			courts: this.props.courts
	// 		})
	// 	}
	// }

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
	    controlText.innerHTML = '<b><center> Map Key </center></b><br />' +
	    '<img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B" /> Tennis Club<br />' +
	    '<img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E" /> Public Tennis Court<br />' +
	    '<img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"/> Tennis Shop<br />' +
	    '<img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff" /> Other Facility <br />';
	    
	    controlUI.appendChild(controlText); 
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.courts.length > 0){
			return false;
		}else{
			return true;
		}
	}
	
  	
  	render(){

  		var style = {
    		height: '500px', 
			width: '100%',
            margin: '0 auto 0 auto'
    	}
  		return <div id="map" className="map-gic main-map" style={style} ref="gmap"> I&apos;m a dumb map! </div>
  	}

  	componentDidUpdate(){

  		this.getCourts();
  		
  		if(this.state.courts.length > 0){
  			
	        var courts; 
	        var _this = this; 

	        var map = this.createMap();
	        var bounds = map.getBounds();	        
			var points = this.getPoints();


        	for(var j=0; j<points.length; j++){
	            (function(j){
	          		
	                var marker = _this.createMarker(map,points,j);
	        		var infowindow = _this.setMarkerContent(j); 

			        google.maps.event.addListener(infowindow,'closeclick',function(){
		              _this.setState({
		                expanded: false 
		              }); //removes the marker
		              // then, remove the infowindows name from the array
		            }, {passive: true});
		           
			          

		            google.maps.event.addListener(map,'click',function(){
		           	console.log("map clicked")
			           	_this.setState({
			           		expanded: false
			           	});
			           	infowindow.close(map,marker); 
		            }, {passive: true});

			
		        		bounds.extend(marker.getPosition());
		        		map.setCenter(bounds.getCenter());


		        	google.maps.event.addListener(marker, 'click', function() {
		        			
		        		console.log("clicked ", _this.state);
		        		

	              if(_this.state.expanded === false){
	              
	                infowindow.open(map,marker);      
	              
	              // This is where the court data is set to the state of the app for display
	              _this.setMarkerDataToState(j); 
	              
	              }
	            }, {passive: false});

		         })(j) 
	  		}

	  		this.createLegend(map); 
	  			
		}else{
			
  		}
  	}
}

export default Map


