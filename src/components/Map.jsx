import React, { Component } from 'react';

class Map extends Component {

	componentWillReceiveProps(nextProps) {
		if(nextProps.length > 0){
			this.setState({
				courts: this.props.courts
			})
		}
	}

	componentWillUpdate(){
	
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
  		if(this.props.courts){
  			var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#3a3a3a"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"saturation":"0"},{"lightness":"100"},{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"lightness":"-37"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"lightness":"34"},{"color":"#e74110"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#090909"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#1a1a1a"}]}]; 
	        var courts; 
	        var points = [];
	        var _this = this; 
	        
	            
	        function Legend(controlDiv, map) {
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

				 var mapOptions = {
	                center: new google.maps.LatLng(37.763108, -122.455799),
	                zoom: 13,
	                styles: styles
	            },
	        	
	        	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	        	for(var i = 0; i<_this.props.courts.length; i++){
	        		var temp = [_this.props.courts[i].xcoord,_this.props.courts[i].ycoord]
	        		var a = new google.maps.LatLng(temp[0],temp[1]);
	        		points.push(a);
	        		
	        	}  
	            
	            var bounds = new google.maps.LatLngBounds(); 
	            
	            function getPinColor(data){
	                if(data.type === 'shop'){
	                    return "FE7569"
	                }else if(data.type === 'club'){
	                    return "F8EC3B"
	                }else if (data.type === 'court'){
	                    return "3BF83E"
	                }else if (data.type === 'other'){
	                    return "00ccff"
	                }else{
	                    return "FE7569"
	                }
	            }

	        	for(var j=0; j<points.length; j++){
		          (function(j){

		                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + getPinColor(_this.props.courts[j]),
		                  new google.maps.Size(21, 34),
		                  new google.maps.Point(0,0),
		                  new google.maps.Point(10, 34));
		                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		                  new google.maps.Size(40, 37),
		                  new google.maps.Point(0, 0),
		                  new google.maps.Point(12, 35));
		                
		        		var marker = new google.maps.Marker({
		        			position: points[j],
		              		icon: pinImage,
		              		shadow: pinShadow,
		        			map: map
		        		});
			
		        		bounds.extend(marker.getPosition());
		        		map.setCenter(bounds.getCenter());

		         })(j) 
	  		}
		}else{
			var map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: -34.397, lng: 150.644},
	          zoom: 8
			});
  		}
  	}
}

export default Map


