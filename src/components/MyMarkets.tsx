
import React from 'react';
import { MarketModel, UserAttribute, UserModel } from '../models/UserModel';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Market } from '../components/Market';


interface MyMarketsState {
  userAttributes: UserAttribute[],
  markets: MarketModel[]
}

interface MyMarketProps {
  user: UserModel | undefined
  authService: AuthService
  apiService: ApiService
}



export class MyMarkets extends React.Component<MyMarketProps, MyMarketsState>{
  state: MyMarketsState = {
    userAttributes: [],
    markets: []
  }

  async componentDidMount() {
    if (this.props.user) {
      const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({
        userAttributes: userAttrs
      })
    }
    const markets = await this.props.apiService.getMarkets();
    this.setState({
      markets: markets
    })
  }

  private renderMarkets() {
    const rows: any[] = []
    for (const market of this.state.markets) {
      rows.push(
        <Market marketName={market.marketName} marketLocation={market.marketLocation} marketSeason={market.marketSeason} />
      )
    }
    return <table>
      <tbody>{rows}</tbody>
    </table>
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
        {this.renderMarkets()}
      </div>
    )
  }
}