
import React, { SyntheticEvent } from 'react';
import { UserModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { ApiService } from '../services/ApiService';
import history from '../utils/history';
import { resourceLimits } from 'worker_threads';

interface LogInProps {
  authService: AuthService,
  apiService: ApiService
  setUser: (user: UserModel) => void
}
interface LogInState {
  userName: string,
  password: string,
  loginAttempted: boolean,
  isLoggedIn: boolean,
  email: string
}

interface customEvent {
  target: HTMLInputElement
}


export class LogIn extends React.Component<LogInProps, LogInState> {
  state: LogInState = {
    userName: '',
    password: '',
    email: '',
    loginAttempted: false,
    isLoggedIn: false
  }

  private setUserName(event: customEvent) {
    this.setState({ userName: event.target.value })

  }

  private setUserEmail(event: customEvent) {
    this.setState({ email: event.target.value })
  }

  private setPassword(event: customEvent) {
    this.setState({ password: event.target.value })
  }

  private getAllUsers = async (): Promise<UserModel[]> => {
    const result = await this.props.apiService.getUsers();
    return result;
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const users = await this.getAllUsers();
    this.setState({ loginAttempted: true })
    const result = await this.props.authService.login(this.state.email, this.state.password, users)

    if (result) {
      this.setState({ isLoggedIn: true })
      this.props.setUser(result)
      history.push('/mymarkets')
    } else {
      this.setState({ isLoggedIn: false })
    }

  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.isLoggedIn) {
        loginMessage = <label>Login Successful! </label>
      } else {
        loginMessage = <label>Username or Password Incorrect </label>
      }
    }

    return (
      <div>
        <h2>Please Login: </h2>
        <form onSubmit={event => { this.handleSubmit(event) }}>
          <input value={this.state.email} onChange={event => { this.setUserEmail(event) }} /><br />
          <input value={this.state.password} onChange={event => { this.setPassword(event) }} type='password' /><br />
          <button type='submit'> SUBMIT </button>
        </form>
        {loginMessage}

      </div>
    )
  }

}