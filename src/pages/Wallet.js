import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions';
import Table from '../components/Table';
import '../style/header.css';
import '../style/form.css';

const initialPayment = 'Cartão de crédito';
const initialTag = 'Lazer';

class Wallet extends React.Component {
  state = {
    currencyHeader: 'BRL',
    tag: initialTag,
    description: '',
    method: initialPayment,
    value: 0,
    currency: 'USD',
    ticker: [],
  }

  async componentDidMount() {
    this.setState({ ticker: await this.fetchTicker() });
  }

  getTotalValue = () => {
    const { expenses } = this.props;
    const total = expenses.map((
      { value, exchangeRates, currency },
    ) => value * exchangeRates[currency].ask)
      .reduce((acc, number) => acc + number, 0);

    return total.toFixed(2);
  }

  submit = async (e) => {
    e.preventDefault();
    const { expenses } = this.props;
    const { walletDispatch } = this.props;
    const id = expenses.length;
    const exchangeRates = await this.fetchTicker('submit');

    walletDispatch(this.state, exchangeRates, id);

    this.setState({
      total: 0,
      courrencyHeader: 'BRL',
      tag: 'Trabalho',
      description: '',
      method: 'Cartão de débito',
      value: 0,
      currency: '',
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  fetchTicker = async (submit) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const arrayData = Object.keys(data).filter((ticker) => ticker !== 'USDT');
      if (submit === 'submit') return data;
      return arrayData;
    } catch (error) {
      return error;
    }
  }

  render() {
    const { email } = this.props;
    const {
      currencyHeader, value, method,
      description, tag, currency, ticker } = this.state;
    return (
      <>
        <header>
          <h1>TrybeWallet</h1>
          <section className="sectionHeader">
            <p data-testid="email-field">{`Email: ${email}`}</p>
            <p data-testid="total-field">{`Total: ${this.getTotalValue()}`}</p>
            <p data-testid="header-currency-field">{currencyHeader}</p>
          </section>
        </header>

        <form onSubmit={ this.submit } className="form">
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
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {ticker.map((
                tick,
              ) => <option key={ tick } data-testid={ `${tick}` }>{tick}</option>)}
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
        <Table />
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletDispatch: (
    state, exchangeRates, id,
  ) => dispatch(walletAction(state, exchangeRates, id)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  walletDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
