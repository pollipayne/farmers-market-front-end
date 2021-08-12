
import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import { UserModel } from '../models/Models'
import '../styles/NewMarketForm.css'
interface MarketFormProps {
  apiService: ApiService
  updateMarkets: () => void;
  user: UserModel
}

interface NewMarketState {
  marketName: string,
  marketLocation: string,
  marketSeason: string,
  id?: number
  users: UserModel[]
}



export class NewMarketForm extends React.Component<MarketFormProps, NewMarketState> {
  state: NewMarketState = {
    marketName: '',
    marketLocation: '',
    marketSeason: '',
    users: []
  }


  private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ marketName: event.currentTarget.value })
  }

  private onLocationChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ marketLocation: event.currentTarget.value })
  }

  private onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ marketSeason: event.currentTarget.value })
  }

  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.props.user.id) {
      const result = await this.props.apiService.addNewMarket(this.state, this.props.user.id)
      this.props.updateMarkets();
      this.setState({ marketName: '', marketLocation: '', marketSeason: '' })
    }

  }



  render() {
    return (
      <form>
        <div className="new-market-form">
          <h2> Add A New Market </h2>
          <label htmlFor='market-name'> NAME: </label>
          <input name='market-name' onChange={this.onNameChange} type="text" value={this.state.marketName} /><br />
          <label htmlFor="market-location"> LOCATION: </label>
          <input name="market-location" onChange={this.onLocationChange} value={this.state.marketLocation} /><br />
          <label htmlFor='market-hours'> HOURS/SEASON </label>
          <input name='market-hours' onChange={this.onHoursChange} value={this.state.marketSeason} /><br />
          <button onClick={this.handleSubmit} type='submit'> SUBMIT </button>

        </div>
      </form>
    )
  }

}