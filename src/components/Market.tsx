import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import history from '../utils/history'
import '../styles/Market.css'



interface MarketProps {
  id?: number | undefined
  marketName: string,
  marketLocation: string,
  marketSeason: string,
  apiService?: ApiService
  updateMarkets: () => void;
  marketId: number | undefined
  setMarketId: (number: number) => void;
  setMarketName: (string: string) => void;
}

interface MarketState {
  id?: number | undefined
}



export class Market extends React.Component<MarketProps, MarketState> {

  state: MarketState = {
    id: undefined
  }

  private handleDelete = async (event: SyntheticEvent) => {
    event.preventDefault();
    await this.props.apiService?.deleteMarket(this.props.id as number)

    this.props.updateMarkets();

  }

  private handleVendorClick = async (event: SyntheticEvent) => {
    if (this.props.id) {
      this.props.setMarketId(this.props.id)
      this.props.setMarketName(this.props.marketName)
    }
    event.preventDefault();
    history.push('/vendors')
  }

  render() {
    return (
      <div >
        <ul className='single-market-ul'>
          <li className='single-market-name'>{this.props.marketName}</li>
          <li className='single-market-location'>{this.props.marketLocation}</li>
          <li className='single-market-season'>{this.props.marketSeason}</li>
        </ul>
        <button onClick={this.handleVendorClick} className='market-vendors' type='button'>See Vendors</button>
        <button onClick={this.handleDelete} className='delete-market' type='button'> Delete </button>
      </div>
    )
  }
}


