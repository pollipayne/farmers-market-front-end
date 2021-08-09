import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';




interface ProductProps {
  id?: number | undefined
  productName: string,
  productSeason: string,
  apiService?: ApiService
  updateProducts: () => void;
  vendorId: number | undefined
  setVendorId: (number: number) => void;
}

interface ProductState {
  id?: number | undefined
}



export class Product extends React.Component<ProductProps, ProductState> {

  state: ProductState = {
    id: undefined
  }

  private handleDelete = async (event: SyntheticEvent) => {
    event.preventDefault();
    await this.props.apiService?.deleteProduct(this.props.id as number)

    this.props.updateProducts();

  }


  render() {
    return (
      <div>
        <ul>
          <li>{this.props.productName}</li>
          <li>{this.props.productSeason}</li>
        </ul>
        <button onClick={this.handleDelete} className='delete-product' type='button'> Delete </button>
      </div>
    )
  }
}
