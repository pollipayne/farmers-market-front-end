
import React from 'react';



interface FindLocalMarketDetailsProps {

  address: string
  googlelink: string
  products: string
  schedule: string

}




export class LocalMarketDetails extends React.Component<FindLocalMarketDetailsProps> {


  render() {
    return (
      <div>
        <ul>
          <h4>Address</h4>
          <li>{this.props.address}</li>
          <h4>GoogleLink:</h4>
          <li>{this.props.googlelink}</li>
          <h4>Products:</h4>
          <li>{this.props.products}</li>
          <h4>Schedule:</h4>
          <li>{this.props.schedule}</li>
        </ul>
      </div>
    )
  }
}