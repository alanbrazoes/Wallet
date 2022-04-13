const initialState = {
  email: '',
};

const userReducer = (state = initialState, { email, type }) => {
  switch (type) {
  case 'user':
    return { ...state, email };
  default:
    return { ...state };
  }
};

export default userReducer;
