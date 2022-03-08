export const userAction = (email) => ({ type: 'user', email });
export const walletAction = (state, id) => {
  const { tag, courrency, method, description, value } = state;
  return { type: 'wallet', tag, courrency, method, description, value, id };
};
