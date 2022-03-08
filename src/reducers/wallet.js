const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (
  state = initialState,
  { type, tag, description, method, value, courrency, id },
) => {
  switch (type) {
  case 'wallet': {
    return { ...state, expenses: [{ id, tag, courrency, method, description, value }] };
  }
  default:
    return { ...state };
  }
};

export default walletReducer;
