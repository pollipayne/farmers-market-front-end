

export interface UserModel {
  userName: string,
  email: string,
  password: string,
  isLoggedIn: boolean,
  id?: number,
  markets: MarketModel[]
}


export interface UserAttribute {
  Name: string,
  Value: string
}


export interface MarketModel {
  marketName: string,
  marketLocation: string,
  marketSeason: string,
  id?: number
}

export interface LogInState {
  userName: string,
  password: string,
  loginAttempted: boolean,
  isLoggedIn: boolean
}

export interface VendorModel {
  vendorName: string,
  vendorSeason: string,
  marketIds?: number[],
  id?: number
}
