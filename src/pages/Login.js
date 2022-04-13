import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';
import '../style/form.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  }

  validateEmail = () => {
    const { email, password } = this.state;
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minPassword = 6;

    const emailIsValid = emailFormat.test(email);

    if (
      emailIsValid
      && password.length >= minPassword) return this.setState({ isDisable: false });

    this.setState({ isDisable: true });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validateEmail);
  }

  submit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { loginDispatch, history } = this.props;
    loginDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <div className="container">
        <form onSubmit={ this.submit }>
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="email">
              E-mail
              <input
                value={ email }
                onChange={ this.handleChange }
                name="email"
                required
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                value={ password }
                onChange={ this.handleChange }
                name="password"
                required
                minLength={ 6 }
              />
            </label>
            <button
              type="submit"
              disabled={ isDisable }
            >
              ENTRAR
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (state) => dispatch(userAction(state)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
