
import React, { SyntheticEvent } from 'react';
import { VendorModel, UserAttribute, UserModel, MarketModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Vendor } from '../components/Vendor';
import { NewVendorForm } from './NewVendorForm';
import history from '../utils/history'





interface MyVendorsState {
  userAttributes: UserAttribute[],
  vendors: VendorModel[]
}

interface MyVendorProps {
  user: UserModel | undefined
  authService: AuthService
  apiService: ApiService
  history: any
  marketId: number | undefined
  marketName: string | undefined
  setMarketId: (number: number | undefined) => void;
  setMarketName: (string: string) => void;
  vendorId: number | undefined
  vendorName: string | undefined
  setVendorId: (number: number | undefined) => void;
  setVendorName: (string: string) => void;
}


export class MyVendors extends React.Component<MyVendorProps, MyVendorsState>{
  state: MyVendorsState = {
    userAttributes: [],
    vendors: []
  }




  async componentDidMount() {
    if (this.props.user) {
      const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({
        userAttributes: userAttrs
      })
    }
    this.updateVendors();
  }

  updateVendors = async () => {
    const vendorsMatchMarketId: VendorModel[] = []
    const vendors = await this.props.apiService.getVendors();

    if (this.props.marketId) {
      vendors.forEach(vendor => {
        vendor.markets.forEach(market => {
          if (market.id === this.props.marketId) {
            vendorsMatchMarketId.push(vendor)
          }
        })
      })
    }
    this.setState({
      vendors: vendorsMatchMarketId
    })
  }


  private renderVendors() {
    let vendorList: any[] = []

    vendorList = this.state.vendors.map((vendor) => {
      return <li >
        <Vendor key={vendor.id} id={vendor.id} vendorName={vendor.vendorName} vendorSeason={vendor.vendorSeason} apiService={this.props.apiService} updateVendors={this.updateVendors} vendorId={this.props.vendorId} setVendorId={this.props.setVendorId} setVendorName={this.props.setVendorName} />
      </li>
    })
    return (
      <div>
        <ul>
          {vendorList}
        </ul>
      </div>
    )
  }

  private goBackToMarkets = async (event: SyntheticEvent) => {
    event.preventDefault();
    history.goBack();

  }



  render() {

    let profileSpace
    if (this.props.user) {
      profileSpace = <div>
        <h2> Oh hey, {this.props.user?.userName}- these are your favorite vendors from {this.props.marketName} </h2>
        <button onClick={this.goBackToMarkets}>BACK TO MY MARKETS </button>
        <h2> MY VENDORS</h2>
        {this.renderVendors()}
        <section>

          <NewVendorForm apiService={this.props.apiService} updateVendors={this.updateVendors} marketId={this.props.marketId} setMarketId={this.props.setMarketId}></NewVendorForm>
        </section>



      </div>
    } else {
      profileSpace = <div>
        Please <Link to='/login'>Login</Link>
      </div>
    }

    return (
      <div>
        {profileSpace}<br />

      </div>
    )
  }
}