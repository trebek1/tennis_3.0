const initialState = {
	styles: "wimbledon"
}

const styles = (state = initialState, action) => {
	switch (action.type) {
		case 'SELECT_STYLE':
			return Object.assign ({},state,{
				styles: action.payload
			});
		default:
			return state;
	}
};

export default styles;