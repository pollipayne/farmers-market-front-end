import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import history from '../utils/history'
import '../styles/Vendor.css'




interface VendorProps {
  id?: number | undefined
  vendorName: string,
  vendorSeason: string,
  apiService?: ApiService
  updateVendors: () => void;
  vendorId: number | undefined
  setVendorId: (number: number) => void;
  setVendorName: (string: string) => void;
}
interface VendorState {
  id?: number | undefined
}



export class Vendor extends React.Component<VendorProps> {

  state: VendorState = {
    id: undefined
  }

  private handleDelete = async (event: SyntheticEvent) => {
    event.preventDefault();
    await this.props.apiService?.deleteVendor(this.props.id as number)

    this.props.updateVendors();

  }

  private handleProductClick = async (event: SyntheticEvent) => {
    if (this.props.id) {
      this.props.setVendorId(this.props.id)
      this.props.setVendorName(this.props.vendorName)
    }
    event.preventDefault();
    history.push('/products')
  }



  render() {
    return (
      <div>
        <ul className="vendor-list-item">
          <li className="vendor-name">{this.props.vendorName}</li>
          <li className="vendor-season">{this.props.vendorSeason}</li>
        </ul>
        <button onClick={this.handleProductClick} className='vendor-products' type='button'>See Products</button>
        <button onClick={this.handleDelete} className='delete-vendor' type='button'> Delete </button>
      </div>
    )
  }
}
