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
        <label>{this.props.marketName}</label>
        <label>{this.props.marketLocation}</label>
        <label>{this.props.marketSeason}</label>
      </div>
    )
  }
}