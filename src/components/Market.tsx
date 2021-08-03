import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';




interface MarketProps {
  id?: number | undefined
  marketName: string,
  marketLocation: string,
  marketSeason: string,
  apiService?: ApiService
  updateMarkets: () => void;
}



export class Market extends React.Component<MarketProps> {

  private handleDelete = async (event: SyntheticEvent) => {
    event.preventDefault();
    const result = await this.props.apiService?.deleteMarket(this.props.id as number)
    console.log(result)

    this.props.updateMarkets();


  }

  render() {
    return (
      <div>
        <ul>
          <li>{this.props.marketName}</li>
          <li>{this.props.marketLocation}</li>
          <li>{this.props.marketSeason}</li>
        </ul>
        <button className='market-vendors' type='button'>See Vendors</button>
        <button onClick={this.handleDelete} className='delete-market' type='button'> Delete </button>
      </div>
    )
  }
}


//on click redirect to vendors should go to markets/marketid/vendors? 