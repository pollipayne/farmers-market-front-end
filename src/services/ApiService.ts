import { MarketModel, VendorModel, UserModel, ProductModel, LocalMarketModel, LocalMarketDetails } from '../models/Models';
import axios from 'axios';




export class ApiService {

  public async getUsers(): Promise<UserModel[]> {
    const result: UserModel[] = []

    let response = await axios.get('http://localhost:3001/users')
    const users = response.data
    users.forEach((user: UserModel) => {
      result.push(user)
    })
    return result;
  }

  public async addNewUser(newUser: UserModel): Promise<UserModel> {
    let postUser = await axios.post('http://localhost:3001/users', newUser)
    return postUser.data;
  }


  public async getMarkets(): Promise<MarketModel[]> {

    const result: MarketModel[] = [];
    let response = await axios.get("http://localhost:3001/markets",)
    const markets = response.data;
    markets.forEach((market: MarketModel) => {
      result.push(market)

    })
    return result;
  }


  public async addNewMarket(newMarket: MarketModel, userId: number): Promise<MarketModel> {
    let postMarket = await axios.post('http://localhost:3001/markets', { newMarket: newMarket, userId: userId })
    return postMarket.data;
  }


  public async deleteMarket(marketId: number) {
    let deletedMarket = await axios.delete(`http://localhost:3001/markets/${marketId}`)

    return deletedMarket.data;
  }

  public async getVendors(): Promise<VendorModel[]> {
    const result: VendorModel[] = [];
    let response = await axios.get('http://localhost:3001/vendors')
    const vendors = response.data;
    vendors.forEach((vendor: VendorModel) => {
      result.push(vendor)
    })
    return result;

  }


  public async getSingleVendor(vendorId: number) {
    console.log("im in the function! ")
    const result = await axios.get(`http://localhost:3001/vendors/${vendorId}`)
    console.log(result.data)
    return result.data;

  }

  public async addNewVendor(newVendor: VendorModel, marketId: number): Promise<VendorModel> {
    let postVendor = await axios.post('http://localhost:3001/vendors', { newVendor: newVendor, marketId: marketId })
    console.log(postVendor)
    return postVendor.data;
  }

  public async deleteVendor(vendorId: number) {
    let deletedVendor = await axios.delete(`http://localhost:3001/vendors/${vendorId}`)

    return deletedVendor;
  }


  public async getProducts(): Promise<ProductModel[]> {

    const result: ProductModel[] = [];
    let response = await axios.get("http://localhost:3001/products",)
    const products = response.data;
    products.forEach((product: ProductModel) => {
      result.push(product)
    })
    return result;
  }

  public async addNewProduct(newProduct: ProductModel, vendorId: number): Promise<ProductModel> {
    let postProduct = await axios.post('http://localhost:3001/products', { newProduct: newProduct, vendorId: vendorId })

    return postProduct.data;
  }


  public async deleteProduct(productId: number) {
    let deletedProduct = await axios.delete(`http://localhost:3001/products/${productId}`)

    return deletedProduct;
  }

  public async findLocalMarkets(zipCode: string) {
    const result: LocalMarketModel[] = []

    let response = await axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`)
    if (response) {
      response.data.results.forEach((market: LocalMarketModel) => {
        let marketId = market.id
        let marketname = market.marketname.split(" ").slice(1).join(" ")
        result.push({ id: marketId, marketname: marketname })
      })
    }
    return result;
  }

  public async getLocalMarketInfo(localMarketId: string) {

    let response = await axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${localMarketId}`)

    return response.data.marketdetails;
  }



};


