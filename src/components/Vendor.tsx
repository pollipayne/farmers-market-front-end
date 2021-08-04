import React, { SyntheticEvent } from 'react';
import { ApiService } from '../services/ApiService';
import history from '../utils/history'




interface VendorProps {
  id?: number | undefined
  vendorName: string,
  vendorSeason: string,
  apiService?: ApiService
  updateVendors: () => void;
}



export class Vendor extends React.Component<VendorProps> {

  // private handleDelete = async (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   await this.props.apiService?.deleteMarket(this.props.id as number)

  //   this.props.updateMarkets();

  // }



  render() {
    return (
      <div>
        <ul>
          <li>{this.props.vendorName}</li>
          <li>{this.props.vendorSeason}</li>
        </ul>
        <button className='vendor-products' type='button'>See Products</button>
        <button className='delete-vendor' type='button'> Delete </button>
      </div>
    )
  }
}
