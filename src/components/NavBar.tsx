
import React from 'react';
import { UserModel, MarketModel } from '../models/Models';
import { Link } from 'react-router-dom';

interface NavBarProps {
  user: UserModel | undefined
  logOut: () => void;
}

interface NavBarState {
  isLoggedIn: boolean | undefined,
}


export class NavBar extends React.Component<NavBarProps, NavBarState> {
  state: NavBarState = {
    isLoggedIn: this.props.user?.isLoggedIn,
  }

  private changeLogState = () => {
    this.props.logOut()
    this.setState({ isLoggedIn: false })

  }


  render() {

    return (
      <div className="navbar">
        <Link to='/login'> HOME </Link>
        <Link to='/mymarkets'> My Markets </Link>
        <Link to='/logout' onClick={this.changeLogState}> LOGOUT </Link>


      </div>
    )
  }
}