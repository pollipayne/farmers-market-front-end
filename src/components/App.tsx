import axios from 'axios';
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
import { Market } from '../components/Market';
import { ApiService } from '../services/ApiService';




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

  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <div>
            <NavBar user={this.state.user} />
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






