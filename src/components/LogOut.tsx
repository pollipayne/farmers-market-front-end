import { Link } from 'react-router-dom'
import React from 'react';
import { UserModel } from '../models/Models'

interface LogOutProps {
  user: UserModel | undefined
  setUser: (user: UserModel) => void;
}

export class LogOut extends React.Component<LogOutProps> {

  // public logUserOut = () => {
  //   this.props.setUser({
  //     userName: '',
  //     email: '',
  //     password: '',
  //     isLoggedIn: false,
  //     id: undefined,
  //     markets: []
  //   })
  // }

  render() {


    return (
      <div>
        {/* {this.logUserOut()} */}

        {console.log(this.props.user)}
        You have been logged out.
        <Link to="/login">Log in again </Link>
      </div>
    )
  }
}