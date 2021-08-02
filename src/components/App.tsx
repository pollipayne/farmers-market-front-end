import './App.css';
import { MarketModel, UserModel } from '../models/UserModel'
import { AuthService } from '../services/AuthService'
import { LogIn } from './LogIn';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { NavBar } from './NavBar';
import { MyMarkets } from './MyMarkets';
import React from 'react';
import { LogOut } from './LogOut';
import { ApiService } from '../services/ApiService';
// import GoogleLogin from 'react-google-login';




interface AppState {
  user: UserModel | undefined
  market: MarketModel | undefined
};

export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();
  private apiService: ApiService = new ApiService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
      market: undefined
    }

    this.setUser = this.setUser.bind(this)
  }
  private setUser(user: UserModel) {
    this.setState({
      user: user
    })
  }

  // public async handleLogin(googleData: any) {
  //   const res = await fetch("/api/v1/auth/google", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   const data = await res.json()
  //   // store returned user somehow
  //   console.log(data)
  // }

  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <div>
            <NavBar user={this.state.user} />
            {/* <GoogleLogin
              clientId={String(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
              buttonText="Log in with Google"
              onSuccess={this.handleLogin}
              onFailure={this.handleLogin}
              cookiePolicy={'single_host_origin'}
            /> */}
            <Switch>
              <Route exact path='/'>
                <LogIn authService={this.authService} setUser={this.setUser} />
              </Route>
              <Route exact path='/login'>
                <LogIn authService={this.authService} setUser={this.setUser}></LogIn>
              </Route>
              <Route exact path='/mymarkets'>
                <MyMarkets authService={this.authService} user={this.state.user} apiService={this.apiService} />
              </Route>
              <Route>
                <LogOut></LogOut>
              </Route>
            </Switch>
          </div>
        </Router>


      </div>
    )
  };
}






