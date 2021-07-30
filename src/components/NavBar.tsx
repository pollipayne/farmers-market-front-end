
import React from 'react';
import { UserModel } from '../models/UserModel';
import { Link } from 'react-router-dom';




export class NavBar extends React.Component<{
  user: UserModel | undefined
}> {


  render() {
    let logInLogOut: any
    if (this.props.user) {
      logInLogOut = <Link to='/logout'>{this.props.user.userName}</Link>
    } else {
      logInLogOut = <Link to='/login'>Log In: </Link>
    }


    return (
      <div className="navbar">
        <Link to='/'> HOME </Link>
        <Link to='/mymarkets'> My Markets </Link>
        {logInLogOut}
      </div>
    )
  }
}