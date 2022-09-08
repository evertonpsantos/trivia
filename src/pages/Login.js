import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitToStore } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, userName } = this.state;
      if (email && userName) {
        return this.setState({ isDisabled: false });
      }
      this.setState({ isDisabled: true });
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history: { push }, dispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', token);
    dispatch(submitToStore(this.state));
    push('/game');
  };

  goToSettings = (event) => {
    event.preventDefault();
    const { history: { push } } = this.props;
    push('/settings');
  };

  render() {
    const { email, userName, isDisabled } = this.state;

    return (
      <>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToSettings }
        >
          Configurações
        </button>

        <h2>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email-input">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              id="email-input"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password-input">
            E-mail:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="password-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
