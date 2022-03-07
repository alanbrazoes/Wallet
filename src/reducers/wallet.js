// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'wallet':
    return { ...action.state };
  default:
    return { ...state };
  }
};

export default walletReducer;
