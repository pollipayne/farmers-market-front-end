import { MarketModel } from '../models/UserModel';


export class ApiService {

  public async getMarkets(): Promise<MarketModel[]> {
    const result: MarketModel[] = [];
    result.push({
      marketName: "West Seattle Market",
      marketLocation: "West Seattle",
      marketSeason: "Sundays, 11-2PM"
    })
    return result;
  }
}