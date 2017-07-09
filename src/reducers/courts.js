
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
			}
			return Object.assign ({},state,{
				
				sortedCourts
			});
		default:
			return state;
	}
};

export default courts;