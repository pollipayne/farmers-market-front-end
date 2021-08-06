
import React from 'react';
import { UserAttribute, UserModel, ProductModel } from '../models/Models';
import { AuthService } from '../services/AuthService';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Product } from './Product';
import { NewProductForm } from './NewProductForm'





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
    }
    console.log(this.props.vendorId)
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


  private renderProducts() {
    let productList: any[] = []

    productList = this.state.products.map((product) => {
      return <li >
        <Product key={product.id} id={product.id} productName={product.productName} productSeason={product.productSeason} apiService={this.props.apiService} updateProducts={this.updateProducts} vendorId={this.props.vendorId} setVendorId={this.props.setVendorId} />
      </li>
    })
    return (
      <div>
        <ul>
          {productList}
        </ul>
      </div>
    )
  }



  render() {

    let profileSpace
    if (this.props.user) {
      profileSpace = <div>
        <h2> WELCOME {this.props.user?.userName} !</h2>
        <h2> MY PRODUCTS</h2>
        {this.renderProducts()}
        <section>

          <NewProductForm apiService={this.props.apiService} updateProducts={this.updateProducts} vendorId={this.props.vendorId} setVendorId={this.props.setVendorId}></NewProductForm>
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