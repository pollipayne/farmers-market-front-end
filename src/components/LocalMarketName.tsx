
import React, { SyntheticEvent } from 'react';
import { LocalMarketDetails } from './LocalMarketDetails';
import { ApiService } from '../services/ApiService'
import "../styles/LocalMarketName.css"



interface FindLocalMarketsProps {
  id: string
  marketname: string
  apiService: ApiService
}

interface FindLocalMarketsState {
  isClicked: boolean
  marketDetails: any[]
}



export class LocalMarketName extends React.Component<FindLocalMarketsProps> {

  state: FindLocalMarketsState = { isClicked: false, marketDetails: [] }


  renderMarketDetails = async (marketId: string | null) => {
    const updateMarketDetails: any[] = []
    const singleMarket = await this.props.apiService.getLocalMarketInfo(this.props.id)
    updateMarketDetails.push(
      <div>
        <LocalMarketDetails address={singleMarket.Address} googlelink={singleMarket.GoogleLink} products={singleMarket.Products} schedule={singleMarket.Schedule}></LocalMarketDetails>
      </div>)
    this.setState({ marketDetails: updateMarketDetails })
  }


  componentClick = (event: SyntheticEvent) => {
    event.preventDefault();
    this.setState({ isClicked: true })
  }


  componentUnClick = (event: SyntheticEvent) => {
    event.preventDefault()
    this.setState({ isClicked: false, marketDetails: [] })
  }


  componentDidUpdate(prevProps: FindLocalMarketsProps, prevState: FindLocalMarketsState) {
    if (prevState.isClicked !== this.state.isClicked) {
      if (this.state.isClicked) {
        const details = this.renderMarketDetails(this.props.id)
        return details;
      }
    }
  }


  render() {
    let isButtonClicked
    if (this.state.isClicked) {
      isButtonClicked = <button className="show-less-button" data-tag={this.props.id} onClick={this.componentUnClick}> SHOW LESS </button>
    } else {
      isButtonClicked =
        <button className="show-more-button" data-tag={this.props.id} onClick={this.componentClick}>SHOW MORE</button>
    }
    return (
      <div className="market-name" >
        <h3 className='market-name-header'>{this.props.marketname} </h3>
        {this.state.marketDetails}
        {isButtonClicked}
      </div>
    )
  }


}

