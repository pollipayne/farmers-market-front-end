

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
  products: ProductModel[]
  id?: number
}

export interface ProductModel {
  productName: string,
  productSeason: string,
  vendors: VendorModel[],
  id?: number
}

export interface LocalMarketModel {
  id: string
  marketname: string
}

export interface LocalMarketDetails {
  GoogleLink: string
  Address: string
  Schedule: string
  Products: string
}