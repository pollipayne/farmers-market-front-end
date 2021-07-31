import { MarketModel } from '../models/UserModel';
import axios from 'axios';


export class ApiService {

  public async getMarkets(): Promise<MarketModel[]> {
    const result: MarketModel[] = [];
    axios.get("http://localhost:3001/markets")
      .then((response) => {
        console.log(response.data)

        const markets = response.data
        markets.forEach((market: MarketModel) => {
          result.push(market)
        });
      })
      .catch((error) => {
        console.log(error)
      })

    return result;
  }
}