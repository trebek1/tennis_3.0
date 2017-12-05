const initialState = {
  login: false,
  id: '',
  address: '',
  username: '',
  passphrase: '',
  coin: '',
  message: '',
};

const login = (state = initialState, action) => {
  let data;
  switch (action.type) {
    case 'LOGIN':
      data = action.data.data;
      return Object.assign({}, state, {
        login: true,
        id: data.id,
        address: data.address,
        username: data.username,
        passphrase: data.passphrase,
        coin: data.coin,
      });
    case 'LOGOUT':
      return Object.assign({}, state, initialState);
    case 'ERROR':
      data = action.data.data;
      return Object.assign({}, state, { login: false, message: data });
    default:
      return state;
  }
};

export default login;
