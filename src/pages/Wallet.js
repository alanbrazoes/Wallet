import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions';

class Wallet extends React.Component {
  state = {
    total: 0,
    courrencyHeader: 'BRL',
    tag: '',
    description: '',
    method: '',
    value: 0,
    courrency: '',
    ticker: false,
  }

  componentDidMount() {
    this.fetchTicker();
  }

  submit = (e) => {
    e.preventDefault();
    const { expenses } = this.props;
    const { walletDispatch } = this.props;
    const id = expenses.length;

    walletDispatch(this.state, id);
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  fetchTicker = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const arrayData = Object.keys(data);
      this.setState({ ticker: arrayData });
    } catch (error) {
      return error;
    }
  }

  render() {
    const { email } = this.props;
    const {
      total, courrencyHeader, value, method,
      description, tag, courrency, ticker } = this.state;
    return (
      <>
        <header>
          <h1>TrybeWallet</h1>
          <section>
            <p data-testid="email-field">{`Email: ${email}`}</p>
            <p data-testid="total-field">{`Total: ${total}`}</p>
            <p data-testid="header-currency-field">{courrencyHeader}</p>
          </section>
        </header>

        <form onSubmit={ this.submit }>
          <label htmlFor="value">
            Valor
            <input
              onChange={ this.handleChange }
              type="number"
              name="value"
              data-testid="value-input"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              onChange={ this.handleChange }
              name="description"
              data-testid="description-input"
              value={ description }
            />
          </label>
          <label htmlFor="courrent" data-testid="currency-input">
            Moeda
            <select
              name="courrency"
              value={ courrency }
              onChange={ this.handleChange }
            >
              {ticker && ticker.map((tick) => <option key={ tick }>{tick}</option>)}
            </select>
          </label>
          <label htmlFor="method" data-testid="method-input">
            <select
              onChange={ this.handleChange }
              name="method"
              value={ method }
            >
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
              <option>Dinheiro</option>
            </select>
          </label>
          <label htmlFor="tag" data-testid="tag-input">
            <select
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
            >
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Saúde</option>
              <option>Transporte</option>
              <option>Alimentação</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletDispatch: (state, id) => dispatch(walletAction(state, id)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  walletDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
