
import React, { SyntheticEvent } from 'react';
import { UserAttribute, UserModel, ProductModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Product } from './Product';
import { NewProductForm } from './NewProductForm'
import history from '../utils/history'
import '../styles/MyProducts.css'



interface MyProductsState {
  userAttributes: UserAttribute[],
  products: ProductModel[]
}

interface MyProductProps {
  user: UserModel | undefined
  authService: AuthService
  apiService: ApiService
  history: any
  vendorId: number | undefined
  setVendorId: (number: number | undefined) => void;
  vendorName: string | undefined
  setPathName: (pathname: string) => void;
}


export class MyProducts extends React.Component<MyProductProps, MyProductsState>{
  state: MyProductsState = {
    userAttributes: [],
    products: []
  }


  async componentDidMount() {
    if (this.props.user) {
      const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
      this.setState({
        userAttributes: userAttrs
      })
      this.props.setPathName('wrapper-products')
    }
    this.updateProducts();
  }


  updateProducts = async () => {
    const vendorsProducts: ProductModel[] = []
    const products = await this.props.apiService.getProducts();
    if (this.props.vendorId) {
      products.forEach(product => {
        product.vendors.forEach(vendor => {
          if (vendor.id === this.props.vendorId) {
            vendorsProducts.push(product)
          }
        })
      })
    }
    this.setState({
      products: vendorsProducts
    })
  }


  private getVendorName = async () => {
    if (this.props.vendorId) {
      const currentVendor = await this.props.apiService.getSingleVendor(this.props.vendorId)
      console.log(currentVendor.vendorName)
      return currentVendor.vendorName;
    }
  }


  private renderProducts() {
    let productList: any[] = []
    productList = this.state.products.map((product) => {
      return (
        <li className="product-list-item">
          <Product key={product.id} id={product.id} productName={product.productName} productSeason={product.productSeason} apiService={this.props.apiService} updateProducts={this.updateProducts} vendorId={this.props.vendorId} setVendorId={this.props.setVendorId} />
        </li>
      )
    })
    return (
      <div>
        <ul className="product-unordered-list">
          {productList}
        </ul>
      </div>
    )
  }


  private goBackToVendors = async (event: SyntheticEvent) => {
    event.preventDefault();
    history.goBack();
  }


  render() {
    let profileSpace
    if (this.props.user) {
      profileSpace = <>
        <h2 className="welcome-products-header" > Oh hey, {this.props.user?.userName}- these are your favorite products from {this.props.vendorName} </h2>
        <button className="back-to-vendors-button" onClick={this.goBackToVendors}>BACK TO MY VENDORS </button>
        <div className="my-products-page-wrapper">
          <div className="my-products-list-wrapper">
            <h2> MY PRODUCTS</h2>
            {this.renderProducts()}
          </div>
          <section className="new-product-form-wrapper">
            <NewProductForm apiService={this.props.apiService} updateProducts={this.updateProducts} vendorId={this.props.vendorId} setVendorId={this.props.setVendorId}></NewProductForm>
          </section>
        </div>
      </>
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