
import React from 'react';
import { UserModel } from '../models/Models';
import { Link } from 'react-router-dom';




export class NavBar extends React.Component<{
  user: UserModel | undefined
}> {


  render() {
    let logInLogOut: any
    if (this.props.user) {
      logInLogOut = <Link to='/logout'> LOGOUT </Link>
    } else {
      logInLogOut = <Link to='/login'> HOME</Link>
    }


    return (
      <div className="navbar">
        {logInLogOut}
        <Link to='/mymarkets'> My Markets </Link>

      </div>
    )
  }
}