const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'user':
    return { ...state, email: action.email };
  default:
    return { ...state };
  }
};

export default userReducer;
