import React from 'react';


interface MarketProps {
  marketName: string,
  marketLocation: string,
  marketSeason: string
}

export class Market extends React.Component<MarketProps> {

  render() {
    return (
      <div>
        <ul>
          <li>{this.props.marketName}</li>
          <li>{this.props.marketLocation}</li>
          <li>{this.props.marketSeason}</li>
        </ul>
        <button className='market-vendors' type='button'>See Vendors</button>
      </div>
    )
  }
}


//on click redirect to vendors should go to markets/marketid/vendors? 