import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import '../styles/Products.css';



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
        <ul className="product-list-item">
          <li className="product-name">{this.props.productName}</li>
          <li className="product-season">{this.props.productSeason}</li>
          <button className="product-delete" onClick={this.handleDelete} type='button'> Delete </button>

        </ul>
      </div>
    )
  }
}
