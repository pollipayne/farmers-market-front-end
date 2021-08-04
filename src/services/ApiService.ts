import { MarketModel, VendorModel } from '../models/Models';
import axios from 'axios';




export class ApiService {

  public async getMarkets(): Promise<MarketModel[]> {

    const result: MarketModel[] = [];
    let response = await axios.get("http://localhost:3001/markets",)
    const markets = response.data;
    markets.forEach((market: MarketModel) => {
      result.push(market)

    })
    return result;
  }


  public async addNewMarket(newMarket: MarketModel): Promise<MarketModel> {
    let postMarket = await axios.post('http://localhost:3001/markets', newMarket)

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

  public async addNewVendor(newVendor: VendorModel): Promise<VendorModel> {
    let postVendor = await axios.post('http://localhost:3001/vendors', newVendor)

    return postVendor.data;
  }

  public async deleteVendor(vendorId: number) {
    let deletedVendor = await axios.delete(`http://localhost:3001/vendors/${vendorId}`)

    return deletedVendor;
  }


};


