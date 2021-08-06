
import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import { AuthService } from '../services/AuthService';
import { MarketModel, UserModel } from '../models/Models'
import history from '../utils/history'




interface SignUpFormProps {
  apiService: ApiService
  authService: AuthService
  user: UserModel | undefined
  getAllUsers: () => Promise<UserModel[]>
  setUser: (user: UserModel) => void

}

interface SignUpFormState {
  userName: string,
  email: string,
  password: string,
  isLoggedIn: boolean,
  id?: number | undefined
  markets: MarketModel[]

}



export class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
  state: SignUpFormState = {
    userName: '',
    email: '',
    password: '',
    isLoggedIn: false,
    id: undefined,
    markets: []
  }


  private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ userName: event.currentTarget.value })
  }

  private onEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value })
  }

  private onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value })
  }

  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await this.props.apiService.addNewUser(this.state)
    console.log(result)
    this.setState({ userName: '', email: '', password: '' })

    const allUsers = await this.props.getAllUsers();

    const logInResult = await this.props.authService.login(result.email, result.password, allUsers)
    if (logInResult) {
      this.setState({ isLoggedIn: true })
      this.props.setUser(result)
      this.props.user!.isLoggedIn = true
      history.push('/mymarkets')
    } else {
      this.setState({ isLoggedIn: false })
    }

  }


  render() {
    return (
      <form>
        <div>
          <h2> Sign Up! </h2>
          <label htmlFor='user-signup-name'> USER NAME: </label>
          <input name='user-signup-name' onChange={this.onNameChange} type="text" value={this.state.userName} /><br />
          <label htmlFor="signup-email"> EMAIL ADDRESS : </label>
          <input name="signup-email" onChange={this.onEmailChange} value={this.state.email} /><br />
          <label htmlFor='signup-password'> PASSWORD </label>
          <input name='signup-password' onChange={this.onPasswordChange} value={this.state.password} /><br />
          <button onClick={this.handleSubmit} type='submit'> SUBMIT </button>

        </div>
      </form>
    )
  }
}
