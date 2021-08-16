import React, { ReactHTML, SyntheticEvent } from 'react';
import { LocalMarketModel } from '../models/Models';
import { ApiService } from '../services/ApiService';
import { LocalMarketDetails } from './LocalMarketDetails';
import { LocalMarketName } from './LocalMarketName'
import '../styles/FindLocalMarkets.css'



interface FindLocalMarketsProps {
  apiService: ApiService
  setPathName: (pathname: string) => void;

}

interface FindLocalMarketsState {
  zipSearch: string
  marketname: string
  address: string
  googlelink: string
  products: string
  schedule: string
  localMarketNames: LocalMarketModel[]
  localMarketDetails: LocalMarketDetails[]
}


export class FindLocalMarkets extends React.Component<FindLocalMarketsProps, FindLocalMarketsState> {

  state: FindLocalMarketsState = {
    zipSearch: '',
    marketname: '',
    address: '',
    googlelink: '',
    products: '',
    schedule: '',
    localMarketNames: [],
    localMarketDetails: [],
  }

  async componentDidMount() {
    this.props.setPathName('wrapper-find')
  }


  private onZipChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ zipSearch: event.currentTarget.value })
  }

  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const marketNames = await this.props.apiService.findLocalMarkets(this.state.zipSearch)
    this.setState({ localMarketNames: marketNames })

  }


  renderMarketNames = () => {
    let nameList: any[] = []
    nameList = this.state.localMarketNames.map((marketName) => {
      return <li >
        <LocalMarketName key={marketName.id} id={marketName.id} marketname={marketName.marketname} apiService={this.props.apiService} />
      </li>
    })
    return (
      <div>
        <ul className="market-name-unordered-list">
          {nameList}
        </ul>
      </div>
    )
  }



  render() {

    return (
      <div className="local-markets-page-wrapper">
        <h2 className="find-markets-header"> What markets are near you? </h2>
        <form className="local-markets-form-wrapper">


          <label className="zip-search" htmlFor='zip-search'> ZIP CODE SEARCH:  </label>
          <input name='zip-search' onChange={this.onZipChange} type='text' value={this.state.zipSearch} /><br />
          <button className="show-markets" onClick={this.handleSubmit} type='submit'>  SEARCH </button>
        </form>
        <div className="scroll-market-names">
          {this.renderMarketNames()}
        </div>
      </div>

    )


  }

}












