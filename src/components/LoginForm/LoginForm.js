import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './Login_Form.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div aria-live="assertive" role="alert">
          {error && <p id="login_error">{error}</p>}
        </div>
        <div>
          <Label id="hidden" htmlFor="login-username-input">
            Username
          </Label>
          <Input
            aria-label="username"
            aria-required="true"
            ref={this.firstInput}
            placeholder="John123"
            id="login-username-input"
            name="username"
            required
          />
        </div>
        <div>
          <Label id="hidden" htmlFor="login-password-input">
            Password
          </Label>
          <Input
            aria-label="Password"
            aria-required="true"
            id="login-password-input"
            placeholder="********"
            name="password"
            type="password"
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}

export default LoginForm;
