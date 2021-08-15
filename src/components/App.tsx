import '../styles/App.css'
import { UserModel } from '../models/Models'
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
import { Footer } from './Footer'
import { FindLocalMarkets } from './FindLocalMarkets'





interface AppState {
  user: UserModel
  marketId: number | undefined
  marketName: string | undefined
  vendorName: string | undefined
  vendorId: number | undefined
  currentPathName: string
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
      vendorId: undefined,
      marketName: '',
      vendorName: '',
      currentPathName: 'wrapper-home'
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

  private setMarketName = (newMarketName: string | undefined) => {
    this.setState({ marketName: newMarketName })
  }

  private setVendorName = (newVendorName: string | undefined) => {
    this.setState({ vendorName: newVendorName })
  }

  private setPathName = (newPathName: string) => {
    this.setState({ currentPathName: newPathName })

  }


  private logUserOut = () => {
    this.setUser({
      userName: '',
      email: '',
      password: '',
      isLoggedIn: false,
      id: undefined,
      markets: []
    })
  }

  render() {
    return (
      <div className={this.state.currentPathName}>
        <Router history={history}>
          <NavBar
            user={this.state.user}
            logOut={this.logUserOut} />
          <Switch >
            <Route exact path='/'>
              <LogIn
                authService={this.authService}
                setUser={this.setUser}
                apiService={this.apiService}
                user={this.state.user}
                setPathName={this.setPathName} />
            </Route>
            <Route exact path='/login'>
              <LogIn
                authService={this.authService}
                setUser={this.setUser}
                apiService={this.apiService}
                user={this.state.user}
                setPathName={this.setPathName}>
              </LogIn>
            </Route>
            <Route exact path="/findmarkets">
              <FindLocalMarkets apiService={this.apiService}></FindLocalMarkets>
            </Route>
            <Route exact path='/mymarkets'>
              <MyMarkets
                authService={this.authService}
                user={this.state.user}
                apiService={this.apiService}
                marketId={this.state.marketId}
                setMarketId={this.setMarketId}
                marketName={this.state.marketName}
                setMarketName={this.setMarketName}
                setPathName={this.setPathName} />
            </Route>
            <Route exact path='/vendors'>
              <MyVendors
                authService={this.authService}
                user={this.state.user}
                apiService={this.apiService}
                history={history}
                marketId={this.state.marketId}
                marketName={this.state.marketName}
                setMarketName={this.setMarketName}
                vendorName={this.state.vendorName}
                setVendorName={this.setVendorName}
                setMarketId={this.setMarketId}
                vendorId={this.state.vendorId}
                setVendorId={this.setVendorId}
                setPathName={this.setPathName} />
            </Route>
            <Route exact path='/products'>
              <MyProducts
                authService={this.authService}
                user={this.state.user}
                apiService={this.apiService}
                history={history}
                vendorId={this.state.vendorId}
                setVendorId={this.setVendorId}
                vendorName={this.state.vendorName} />

            </Route>
            <Route>
              <LogOut user={this.state.user} setUser={this.setUser} />
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>


      </div>
    )
  };
}






