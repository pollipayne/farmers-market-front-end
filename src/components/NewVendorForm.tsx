
import React, { SyntheticEvent } from 'react';
import { MarketModel, ProductModel } from '../models/Models';
import { ApiService } from '../services/ApiService';

interface VendorFormProps {
  apiService: ApiService
  updateVendors: () => void;
  marketId: number | undefined
  setMarketId: (number: number | undefined) => void
}

interface NewVendorState {
  vendorName: string,
  vendorSeason: string,
  markets: MarketModel[]
  vendorId?: number
  products: ProductModel[]
}



export class NewVendorForm extends React.Component<VendorFormProps, NewVendorState> {
  state: NewVendorState = {
    vendorName: '',
    vendorSeason: '',
    markets: [],
    products: []

  }


  private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ vendorName: event.currentTarget.value })
  }

  private onSeasonChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ vendorSeason: event.currentTarget.value })
  }



  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.props.marketId) {
      const result = await this.props.apiService.addNewVendor(this.state, this.props.marketId)
      this.props.updateVendors();
      this.setState({ vendorName: '', vendorSeason: '' })
      // this.props.setMarketId(undefined)
    }

  }

  render() {
    return (
      <form>
        <div>
          <h2> Add A New Vendor </h2>
          <label htmlFor='vendor-name'> NAME: </label>
          <input name='vendor-name' onChange={this.onNameChange} type="text" value={this.state.vendorName} /><br />
          <label htmlFor="vendor-season"> HOURS/SEASON: </label>
          <input name="vendor-season" onChange={this.onSeasonChange} value={this.state.vendorSeason} /><br />
          <button onClick={this.handleSubmit} type='submit'> SUBMIT </button>

        </div>
      </form>
    )
  }

}