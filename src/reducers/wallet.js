const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (
  state = initialState,
  { type, tag, description, method, value, currency, id, exchangeRates },
) => {
  switch (type) {
  case 'wallet': {
    return { ...state,
      expenses: [
        ...state.expenses,
        { id, value, currency, method, tag, description, exchangeRates },
      ],
    };
  }
  case 'DELETE_EXPENSE': {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== id),
    };
  }
  default:
    return { ...state };
  }
};

export default walletReducer;
