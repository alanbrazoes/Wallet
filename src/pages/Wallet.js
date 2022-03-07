import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  state = {
    total: 0,
    courrency: 'BLR',
  }

  render() {
    const { email } = this.props;
    const { total, courrency } = this.state;
    console.log(email);
    return (
      <header>
        <h1>TrybeWallet</h1>
        <section>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">{`Total: ${total}`}</p>
          <p data-testid="header-currency-field">{courrency}</p>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
