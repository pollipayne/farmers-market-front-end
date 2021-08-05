
import React from 'react';
import { MarketModel, UserAttribute, UserModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Market } from '../components/Market';
import { NewMarketForm } from './NewMarketForm';


interface MyMarketsState {
  userAttributes: UserAttribute[],
  markets: MarketModel[]
}

interface MyMarketProps {
  user: UserModel
  authService: AuthService
  apiService: ApiService
  marketId: number | undefined
  setMarketId: (number: number) => void;
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
    this.updateMarkets();
  }

  updateMarkets = async () => {
    const usersMarkets: MarketModel[] = []
    const markets = await this.props.apiService.getMarkets();

    if (this.props.user) {
      markets.forEach(market => {
        market.users.forEach(user => {
          if (user.id === this.props.user.id) {
            usersMarkets.push(market)
          }
        })
      })
    }
    this.setState({
      markets: usersMarkets
    })
  }


  private renderMarkets() {
    let marketList: any[] = []


    marketList = this.state.markets.map((market) => {
      return <li >
        <Market key={market.id} id={market.id} marketName={market.marketName} marketLocation={market.marketLocation} marketSeason={market.marketSeason} apiService={this.props.apiService} updateMarkets={this.updateMarkets} marketId={this.props.marketId} setMarketId={this.props.setMarketId} />
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
        <section>
          <NewMarketForm apiService={this.props.apiService} updateMarkets={this.updateMarkets} user={this.props.user}></NewMarketForm>
        </section>



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