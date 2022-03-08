export const userAction = (email) => ({ type: 'user', email });

export const walletAction = (state, exchangeRates, id) => {
  const { tag, currency, method, description, value } = state;
  return {
    type: 'wallet', tag, currency, method, description, value, id, exchangeRates,
  };
};
