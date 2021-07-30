import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { UserModel } from '../models/UserModel'
import { AuthService } from '../services/AuthService'
import { LogIn } from './LogIn';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { NavBar } from './NavBar';
import { MyMarkets } from './MyMarkets';
import { Home } from './Home';

interface AppState {
  user: UserModel | undefined
};

export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined
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
              <Route exact path='/' component={Home} />
              <Route exact path='/login'>
                <LogIn authService={this.authService} setUser={this.setUser}></LogIn>
              </Route>
              <Route exact path='/mymarkets' component={MyMarkets} />
            </Switch>
          </div>
        </Router>


      </div>
    )
  };
}






