import { Link } from 'react-router-dom'
import React from 'react';
import { UserModel } from '../models/Models'

interface LogOutProps {
  user: UserModel | undefined
  setUser: (user: UserModel) => void;
}

export class LogOut extends React.Component<LogOutProps> {



  render() {

    return (
      <div>

        {console.log(this.props.user)}
        You have been logged out.
        <Link to="/login">Log in again </Link>
      </div>
    )
  }
}