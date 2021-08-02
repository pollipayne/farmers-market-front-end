import { MarketModel } from '../models/UserModel';
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
}