
import React from 'react';
import { LocalMarketDetails } from './LocalMarketDetails';



interface FindLocalMarketsProps {
  id: string
  marketname: string
}





export class LocalMarketName extends React.Component<FindLocalMarketsProps> {



  render() {
    return (
      <div className="market-name" >
        <h3>{this.props.marketname} </h3>
        <button>SHOW DETAILS</button>
      </div>
    )
  }
}