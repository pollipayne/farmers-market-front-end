

export interface UserModel {
  userName: string,
  email: string,
  isLoggedIn?: boolean
}


export interface UserAttribute {
  Name: string,
  Value: string
}


export interface MarketModel {
  marketName: string,
  marketLocation: string,
  marketSeason: string,
  id: number
}