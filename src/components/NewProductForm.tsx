
import React, { SyntheticEvent } from 'react';
import { VendorModel } from '../models/Models';
import { ApiService } from '../services/ApiService';
import "../styles/NewProductForm.css"

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
      await this.props.apiService.addNewProduct(this.state, this.props.vendorId)
      this.props.updateProducts();
      this.setState({ productName: '', productSeason: '' })
    }
  }


  render() {
    return (
      <form className="new-product-form-items">
        <h2> Add A New Product </h2>
        <label htmlFor='product-name'> NAME: </label>
        <input className="product-name-input" name='product-name' onChange={this.onNameChange} type="text" value={this.state.productName} /><br />
        <label htmlFor="product-season"> SEASON: </label>
        <input className="product-season-input" name="product-season" onChange={this.onSeasonChange} value={this.state.productSeason} /><br />
        <button onClick={this.handleSubmit} type='submit'> SUBMIT </button>
      </form>
    )
  }


}