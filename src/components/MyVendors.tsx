
import React from 'react';
import { VendorModel, UserAttribute, UserModel, MarketModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Vendor } from '../components/Vendor';
import { NewVendorForm } from './NewVendorForm';





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
  setMarketId: (number: number | undefined) => void;
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
    const vendors = await this.props.apiService.getVendors();
    this.setState({
      vendors: vendors
    })
  }

  // public getMarketId = () => {
  //   const marketId = this.props.history.location.detail
  //   console.log(marketId)
  //   return Number(marketId)
  // }

  private renderVendors() {
    /// this is a piece of history state that stores the market ID of the market that was clicked to go to vendors. 
    let vendorList: any[] = []

    vendorList = this.state.vendors.map((vendor) => {
      return <li >
        <Vendor key={vendor.id} id={vendor.id} vendorName={vendor.vendorName} vendorSeason={vendor.vendorSeason} apiService={this.props.apiService} updateVendors={this.updateVendors} />
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



  render() {

    let profileSpace
    if (this.props.user) {
      profileSpace = <div>
        <h2> WELCOME {this.props.user?.userName} !</h2>
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
      <div> Users logged in home page
        {profileSpace}<br />

      </div>
    )
  }
}