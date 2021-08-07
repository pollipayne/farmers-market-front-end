import React, { ReactHTML, SyntheticEvent } from 'react';
import { LocalMarketModel } from '../models/Models';
import { ApiService } from '../services/ApiService';
import { LocalMarketDetails } from './LocalMarketDetails';
import { LocalMarketName } from './LocalMarketName'



interface FindLocalMarketsProps {
  apiService: ApiService

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
    localMarketDetails: []
  }


  private onZipChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ zipSearch: event.currentTarget.value })
  }

  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const marketNames = await this.props.apiService.findLocalMarkets(this.state.zipSearch)
    this.setState({ localMarketNames: marketNames })

  }

  // private handleNameClick = async (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   console.log(event)
  //   console.log(event.target)
  //   return event.target

  // }

  renderMarketNames = () => {
    let nameList: any[] = []

    nameList = this.state.localMarketNames.map((marketName) => {
      return <li >
        <LocalMarketName key={marketName.id} id={marketName.id} marketname={marketName.marketname} />
      </li>
    })
    return (
      <div>
        <ul>
          {nameList}
        </ul>
      </div>
    )
  }


  render() {

    return (
      <form>
        <div>
          <h2> What markets are near you? </h2>
          <label htmlFor='zip-search'> ZIP CODE SEARCH:  </label>
          <input name='zip-search' onChange={this.onZipChange} type='text' value={this.state.zipSearch} /><br />
          <button onClick={this.handleSubmit} type='submit'> SHOW ME </button>
          <div>
            {this.renderMarketNames()}
          </div>

        </div>
      </form>

    )


  }

}












