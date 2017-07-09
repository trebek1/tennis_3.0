
const initialState = {
	courts: [],
	sortedCourts: []
}

const courts = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_COURTS':
			var data = action.data;
			return Object.assign ({},state,{
				courts: action.payload[0].sfcourts,
				sortedCourts: action.payload[0].sfcourts
			});
		case 'SORT_POINTS':
			if(action.payload === "club"){
				var sortedCourts = state.courts.filter(function(court){
					return court.Type === "club"; 
				}); 
			}else if(action.payload === "court"){
				var sortedCourts = state.courts.filter(function(court){
					return court.Type === "Court"; 
				}); 
			}else if(action.payload === "shop"){
				var sortedCourts = state.courts.filter(function(court){
					return court.Type === "shop"; 
				}); 
			}else if(action.payload === "other"){
				var sortedCourts = state.courts.filter(function(court){
					return court.Type === "Other"; 
				}); 
			}else if(action.payload === "all"){
				var sortedCourts = state.courts.filter(function(court){
					return court.Type != null; 
				}); 
			}else{
				sortedCourts = state.sortedCourts; 
			}
			return Object.assign ({},state,{
				sortedCourts
			});
		default:
			return state;
	}
};

export default courts;