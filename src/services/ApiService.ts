import { MarketModel, VendorModel, UserModel, ProductModel, LocalMarketModel } from '../models/Models';
import axios from 'axios';


// const url_path = "http://localhost:3001"
const url_path = "https://cryptic-fjord-56843.herokuapp.com"


export class ApiService {
  public async getUsers(): Promise<UserModel[]> {
    const result: UserModel[] = []
    let response = await axios.get(`${url_path}/users`)
    const users = response.data
    users.forEach((user: UserModel) => {
      result.push(user)
    })
    return result;
  }


  public async addNewUser(newUser: UserModel): Promise<UserModel> {
    let postUser = await axios.post(`${url_path}/users`, newUser)
    return postUser.data;
  }


  public async getMarkets(): Promise<MarketModel[]> {
    const result: MarketModel[] = [];
    let response = await axios.get(`${url_path}/markets`)
    const markets = response.data;
    markets.forEach((market: MarketModel) => {
      result.push(market)
    })
    return result;
  }


  public async addNewMarket(newMarket: MarketModel, userId: number): Promise<MarketModel> {
    let postMarket = await axios.post(`${url_path}/markets`, { newMarket: newMarket, userId: userId })
    return postMarket.data;
  }


  public async deleteMarket(marketId: number) {
    let deletedMarket = await axios.delete(`${url_path}/markets/${marketId}`)
    return deletedMarket.data;
  }


  public async getVendors(): Promise<VendorModel[]> {
    const result: VendorModel[] = [];
    let response = await axios.get(`${url_path}/vendors`)
    const vendors = response.data;
    vendors.forEach((vendor: VendorModel) => {
      result.push(vendor)
    })
    return result;
  }


  public async getSingleVendor(vendorId: number) {
    const result = await axios.get(`${url_path}/vendors/${vendorId}`)
    return result.data;
  }


  public async addNewVendor(newVendor: VendorModel, marketId: number): Promise<VendorModel> {
    let postVendor = await axios.post(`${url_path}/vendors`, { newVendor: newVendor, marketId: marketId })
    return postVendor.data;
  }


  public async deleteVendor(vendorId: number) {
    let deletedVendor = await axios.delete(`${url_path}/vendors/${vendorId}`)
    return deletedVendor;
  }


  public async getProducts(): Promise<ProductModel[]> {
    const result: ProductModel[] = [];
    let response = await axios.get(`${url_path}/products`,)
    const products = response.data;
    products.forEach((product: ProductModel) => {
      result.push(product)
    })
    return result;
  }


  public async addNewProduct(newProduct: ProductModel, vendorId: number): Promise<ProductModel> {
    let postProduct = await axios.post(`${url_path}/products`, { newProduct: newProduct, vendorId: vendorId })
    return postProduct.data;
  }


  public async deleteProduct(productId: number) {
    let deletedProduct = await axios.delete(`${url_path}/products/${productId}`)
    return deletedProduct;
  }


  public async findLocalMarkets(zipCode: string) {
    const result: LocalMarketModel[] = []
    let response = await axios.get(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`)
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
    let response = await axios.get(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${localMarketId}`)
    return response.data.marketdetails;
  }


};


