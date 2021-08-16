
import React from 'react';
import '../styles/LocalMarketDetails.css'



interface FindLocalMarketDetailsProps {

  address: string
  googlelink: string
  products: string
  schedule: string

}




export class LocalMarketDetails extends React.Component<FindLocalMarketDetailsProps> {


  private splitString = () => {
    const newScheduleString = this.props.schedule.split(';')
    console.log(newScheduleString[0])

    return newScheduleString[0]


  }

  render() {
    this.splitString()
    return (
      <div className="popup-container">
        <ul className="market-details-unordered">
          <h4>Address</h4>
          <li><a href={this.props.googlelink}>{this.props.address}</a></li>
          <h4>Products:</h4>
          <li>{this.props.products}</li>
          <h4>Schedule:</h4>
          <li className="last-child">{this.splitString()}</li>
        </ul>
      </div>
    )
  }
}