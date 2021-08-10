
import React, { SyntheticEvent } from 'react';
import { UserModel, MarketModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { ApiService } from '../services/ApiService';
import history from '../utils/history';
import { SignUpForm } from './SignUpForm';
import { GoogleLogin } from 'react-google-login'


interface LogInProps {
  authService: AuthService,
  apiService: ApiService
  setUser: (user: UserModel) => void
  user: UserModel | undefined
}
interface LogInState {
  userName: string,
  password: string,
  loginAttempted: boolean,
  isLoggedIn: boolean,
  email: string
  markets: MarketModel[]
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
    isLoggedIn: false,
    markets: []
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

  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const users = await this.getAllUsers();
    this.setState({ loginAttempted: true })
    const result = await this.props.authService.login(this.state.email, this.state.password, users)

    if (result) {
      this.setState({ isLoggedIn: true })
      this.props.setUser(result)
      this.props.user!.isLoggedIn = true
      history.push('/mymarkets')
    } else {
      this.setState({ isLoggedIn: false })
    }
  }



  responseGoogle = async (response: any) => {
    const email = response.profileObj.email
    const users = await this.getAllUsers();

    this.setState({ loginAttempted: true })
    const result = await this.props.authService.googleLogin(email, users);

    if (result) {
      this.setState({ isLoggedIn: true })
      this.props.setUser(result)
      this.props.user!.isLoggedIn = true
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
    const clientConfig = process.env.REACT_APP_CLIENT_ID as string

    return (
      <div>
        <h2>Welcome! Please log in:  </h2>

        <form onSubmit={event => { this.handleSubmit(event) }}>
          <label htmlFor="user-email">Email: </label>
          <input name='user-email' value={this.state.email} onChange={event => { this.setUserEmail(event) }} /><br />
          <label htmlFor='user-password'>Password:  </label>
          <input name='user-password' value={this.state.password} onChange={event => { this.setPassword(event) }} type='password' /><br />
          <button type='submit'> SUBMIT </button>
        </form>
        {loginMessage}


        <div> Or log in with Google:</div>
        <GoogleLogin
          clientId={clientConfig}
          buttonText='Login'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'} />





        <SignUpForm apiService={this.props.apiService} authService={this.props.authService} user={this.props.user} getAllUsers={this.getAllUsers} setUser={this.props.setUser}></SignUpForm>

      </div>
    )
  }

}