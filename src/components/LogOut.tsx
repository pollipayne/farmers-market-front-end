import { Link } from 'react-router-dom'
import React from 'react';

export class LogOut extends React.Component {

  render() {
    return (
      <div>
        You have been logged out.
        <Link to="/login">Log in again </Link>
      </div>
    )
  }
}