
import React from 'react';
import { UserAttribute, UserModel } from '../models/UserModel';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';


interface MyMarketsState {
  userAttributes: UserAttribute[]
}

interface MyMarketProps {
  user: UserModel | undefined
  authService: AuthService
}



export class MyMarkets extends React.Component<MyMarketProps, MyMarketsState>{
  state: MyMarketsState = {
    userAttributes: []
  }

  async componentDidMount() {
    if (this.props.user) {
      const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({
        userAttributes: userAttrs
      })
    }
  }

  private renderUserAttributes() {
    const rows = []
    for (const UserAttribute of this.state.userAttributes) {
      rows.push(<tr key={UserAttribute.Name}>
        <td>{UserAttribute.Name}</td>
        <td>{UserAttribute.Value}</td>

      </tr>)
    }

    return <table>
      <tbody>{rows}</tbody>
    </table>
  }


  render() {

    let profileSpace
    if (this.props.user) {
      profileSpace = <div>
        <h3> User {this.props.user?.userName} </h3>
        Here are your Attributes:
        {this.renderUserAttributes()}
      </div>
    } else {
      profileSpace = <div>
        Please <Link to='/login'>Login</Link>
      </div>
    }

    return (
      <div> Users logged in home page
        {profileSpace}
      </div>
    )
  }
}