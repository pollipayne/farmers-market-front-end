import { MarketModel } from '../models/Models';
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
};
