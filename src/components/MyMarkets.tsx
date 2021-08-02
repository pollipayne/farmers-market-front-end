
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
      const markets = await this.props.apiService.getMarkets();
      this.setState({
        markets: markets
      })
    }
  }

  private renderMarkets() {
    let marketList: any[] = []
    console.log(this.state.markets)
    marketList = this.state.markets.map((market) => {
      return <li >
        <Market marketName={market.marketName} marketLocation={market.marketLocation} marketSeason={market.marketSeason} />
      </li>
    })
    return (
      <div>
        <ul>
          {marketList}
        </ul>
      </div>
    )
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
        <h2> WELCOME {this.props.user?.userName} !</h2>
        Here are your Attributes:
        {this.renderUserAttributes()}
        <br />
        <h2> MY MARKETS</h2>
        {this.renderMarkets()}

      </div>
    } else {
      profileSpace = <div>
        Please <Link to='/login'>Login</Link>
      </div>
    }

    return (
      <div> Users logged in home page
        {profileSpace}<br />

      </div>
    )
  }
}