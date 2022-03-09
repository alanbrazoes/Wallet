import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { dispatch } from 'redux';
// import { deleteAction } from '../actions';

class Table extends React.Component {
  // deleteExpense = (id) => {
  //   dispatch(deleteAction(id));
  // }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            description, tag, method, exchangeRates, currency, value, id }) => {
            const valueConverted = Number(value * exchangeRates[currency].ask)
              .toFixed(2);
            const exchangeRate = Number(exchangeRates[currency].ask).toFixed(2);
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{`${Number(value).toFixed(2)}`}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{exchangeRate}</td>
                <td>{valueConverted}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    // onClick={ this.deleteExpense(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, null)(Table);
