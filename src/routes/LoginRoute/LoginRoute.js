import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './Login.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <div className='banner_login'>
        <div className='Overlay_login'>
          <h2>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
      </div>
    );
  }
}

export default LoginRoute
