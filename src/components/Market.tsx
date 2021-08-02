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
        <p>{this.props.marketName}</p>
        <p>{this.props.marketLocation}</p>
        <p>{this.props.marketSeason}</p>
      </div>
    )
  }
}