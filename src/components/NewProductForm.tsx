
import React, { SyntheticEvent } from 'react';
import { VendorModel } from '../models/Models';
import { ApiService } from '../services/ApiService';

interface ProductFormProps {
  apiService: ApiService
  updateProducts: () => void;
  vendorId: number | undefined
  setVendorId: (number: number | undefined) => void
}

interface NewProductState {
  productName: string,
  productSeason: string,
  vendors: VendorModel[]
  vendorId?: number
}



export class NewProductForm extends React.Component<ProductFormProps, NewProductState> {
  state: NewProductState = {
    productName: '',
    productSeason: '',
    vendors: [],

  }


  private onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ productName: event.currentTarget.value })
  }

  private onSeasonChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ productSeason: event.currentTarget.value })
  }



  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.props.vendorId) {
      const result = await this.props.apiService.addNewProduct(this.state, this.props.vendorId)
      this.props.updateProducts();
      this.setState({ productName: '', productSeason: '' })
    }

  }

  render() {
    return (
      <form>
        <div>
          <h2> Add A New Product </h2>
          <label htmlFor='vendor-name'> NAME: </label>
          <input name='vendor-name' onChange={this.onNameChange} type="text" value={this.state.productName} /><br />
          <label htmlFor="vendor-season"> SEASON: </label>
          <input name="vendor-season" onChange={this.onSeasonChange} value={this.state.productSeason} /><br />
          <button onClick={this.handleSubmit} type='submit'> SUBMIT </button>

        </div>
      </form>
    )
  }

}