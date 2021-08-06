

export interface UserModel {
  userName: string,
  email: string,
  password: string,
  isLoggedIn: boolean,
  id?: number | undefined
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
  users: UserModel[]
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
  markets: MarketModel[],
  id?: number
}


export interface ProductModel {
  productName: string,
  productSeason: string,
  vendors: VendorModel[],
  id?: number
}