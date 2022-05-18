import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    mudaPagina: false,
    carregar: false,
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  changeLogin = async () => {
    this.setState({ carregar: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      carregar: false,
      mudaPagina: true,
    });
  };

  render() {
    const CHAVE_BUTTON = 3;
    const { name, mudaPagina, carregar } = this.state;
    if (carregar) return <Loading />;
    if (mudaPagina) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <h1>LOGIN</h1>
        <form>
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              placeholder="nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ name.length < CHAVE_BUTTON }
            onClick={ this.changeLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
