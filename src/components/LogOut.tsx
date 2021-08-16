import { Link } from 'react-router-dom'
import React from 'react';
import { UserModel } from '../models/Models'
import "../styles/LogOut.css"


interface LogOutProps {
  user: UserModel | undefined
  setUser: (user: UserModel) => void;
  setPathName: (pathname: string) => void;
}


export class LogOut extends React.Component<LogOutProps> {


  async componentDidMount() {
    this.props.setPathName('wrapper-logout')
  }


  render() {
    return (
      <div className="log-out-wrapper">
        You have been logged out.<br></br><br></br>
        <Link className="link-to-login" to="/login">Log in again.</Link>
      </div>
    )
  }

}