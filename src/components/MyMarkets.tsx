
import React from 'react';
import '../styles/MyMarkets.css'
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
  marketName: string | undefined
  setMarketName: (string: string) => void;
  setPathName: (pathname: string) => void;
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
      this.props.setPathName('wrapper-markets')
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
      return <li className='market-list-item'>
        <Market key={market.id} id={market.id} marketName={market.marketName} marketLocation={market.marketLocation} marketSeason={market.marketSeason} apiService={this.props.apiService} updateMarkets={this.updateMarkets} marketId={this.props.marketId} setMarketId={this.props.setMarketId} setMarketName={this.props.setMarketName} />
      </li>
    })
    return (
      <div>
        <ul className='market-unordered-list'>
          {marketList}
        </ul>
      </div>
    )
  }

  private renderUserAttributes() {
    const rows = []
    for (const UserAttribute of this.state.userAttributes) {
      rows.push(<div key={UserAttribute.Name}>
        <h3 className='welcome-markets-header'>{UserAttribute.Name}</h3>
        <p className='welcome-markets-body'>{UserAttribute.Value}</p>

      </div>)
    }
    return <div>
      {rows}
    </div>
  }


  render() {

    let profileSpace
    if (this.props.user) {
      profileSpace =
        <div>{this.renderUserAttributes()}
          <section className='my-markets-page-wrapper'>

            <div className='my-markets-list-wrapper'>
              <h2 className="my-markets-header"> MY MARKETS</h2>
              {this.renderMarkets()}
            </div>
            <section className='new-market-form-wrapper'>
              <NewMarketForm apiService={this.props.apiService} updateMarkets={this.updateMarkets} user={this.props.user}></NewMarketForm>
            </section>
          </section>



        </div>
    } else {
      profileSpace = <div>
        Please <Link to='/login'>Login</Link>
      </div>
    }

    return (
      <div>
        {profileSpace}<br />

      </div>
    )
  }
}