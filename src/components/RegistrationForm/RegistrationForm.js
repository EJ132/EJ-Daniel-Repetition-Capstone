import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
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
      <form onSubmit={this.handleSubmit} className="reg_form">
        <div aria-live="assertive" role="alert">
          {error && <p id="pass_error">{error}</p>}
        </div>
        <div>
          <Label id="hidden" htmlFor="registration-name-input">
            Enter your name
            <Required />
          </Label>
          <Input
            aria-required="true"
            aria-label="Enter your name"
            ref={this.firstInput}
            placeholder="Full Name"
            id="registration-name-input"
            name="name"
            required
          />
        </div>
        <div>
          <Label id="hidden" htmlFor="registration-username-input">
            Choose a username
            <Required />
          </Label>
          <Input
            aria-required="true"
            aria-label="Enter your name"
            placeholder="user_name"
            id="registration-username-input"
            name="username"
            required
          />
        </div>
        <div>
          <Label id="hidden" htmlFor="registration-password-input">
            Choose a password
            <Required />
          </Label>
          <Input
            aria-required="true"
            aria-label="Choose a password"
            placeholder="password"
            id="registration-password-input"
            name="password"
            type="password"
            required
          />
        </div>
        <footer>
          <Button type="submit">Sign up</Button>{' '}
          <Link id="have_account" to="/login">
            Already have an account?
          </Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;
