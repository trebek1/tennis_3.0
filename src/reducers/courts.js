
const initialState = {
	courts: []
}

const courts = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_COURTS':
			var data = action.data;
			return Object.assign ({},state,{
				
				courts: action.payload[0]
			});
		default:
			return state;
	}
};

export default courts;