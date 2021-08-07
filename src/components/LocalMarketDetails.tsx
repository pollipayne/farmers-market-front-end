
import React from 'react';



interface FindLocalMarketDetailsProps {

  address: string
  googlelink: string
  products: string
  schedule: string

}

interface FindLocalMarketDetailsState {

}



export class LocalMarketDetails extends React.Component<FindLocalMarketDetailsProps, FindLocalMarketDetailsState> {


  render() {
    return (
      <div>
        <ul>
          <li>{this.props.address}</li>
          <li>{this.props.googlelink}</li>
          <li>{this.props.products}</li>
          <li>{this.props.schedule}</li>
        </ul>
      </div>
    )
  }
}