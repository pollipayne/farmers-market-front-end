import './App.css';
import { MarketModel, UserModel } from '../models/Models'
import { AuthService } from '../services/AuthService'
import { LogIn } from './LogIn';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import { NavBar } from './NavBar';
import { MyMarkets } from './MyMarkets';
import React from 'react';
import { LogOut } from './LogOut';
import { ApiService } from '../services/ApiService';
import { MyVendors } from './MyVendors'
import { MyProducts } from './MyProducts'





interface AppState {
  user: UserModel
  marketId: number | undefined
  vendorId: number | undefined
};

export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();
  private apiService: ApiService = new ApiService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        userName: '',
        email: '',
        password: '',
        isLoggedIn: false,
        id: undefined,
        markets: []
      },
      marketId: undefined,
      vendorId: undefined
    }

    this.setUser = this.setUser.bind(this)

  }
  private setUser(user: UserModel) {
    this.setState({
      user: user
    })
  }

  private setMarketId = (newMarketId: number | undefined) => {
    this.setState({ marketId: newMarketId })
  }

  private setVendorId = (newVendorId: number | undefined) => {
    this.setState({ vendorId: newVendorId })
  }


  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <div>
            <NavBar user={this.state.user} />
            <Switch>
              <Route exact path='/'>
                <LogIn authService={this.authService} setUser={this.setUser} apiService={this.apiService} user={this.state.user} />
              </Route>
              <Route exact path='/login'>
                <LogIn authService={this.authService} setUser={this.setUser} apiService={this.apiService} user={this.state.user}></LogIn>
              </Route>
              <Route exact path='/mymarkets'>
                <MyMarkets authService={this.authService} user={this.state.user} apiService={this.apiService} marketId={this.state.marketId} setMarketId={this.setMarketId} />
              </Route>
              <Route exact path='/vendors'>
                <MyVendors authService={this.authService} user={this.state.user} apiService={this.apiService} history={history} marketId={this.state.marketId} setMarketId={this.setMarketId} vendorId={this.state.vendorId} setVendorId={this.setVendorId} />
              </Route>
              <Route exact path='/products'>
                <MyProducts authService={this.authService} user={this.state.user} apiService={this.apiService} history={history} vendorId={this.state.vendorId} setVendorId={this.setVendorId} />

              </Route>
              <Route>
                <LogOut />
              </Route>
            </Switch>
          </div>
        </Router>


      </div>
    )
  };
}






