import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  state = {
    total: 0,
    courrency: 'BLR',
  }

  render() {
    const { user: { email } } = this.props;
    const { total, courrency } = this.state;
    return (
      <header>
        <h1 data-testid="email-field">{email}</h1>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">{courrency}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
