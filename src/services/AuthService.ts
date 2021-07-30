import { UserModel } from '../models/UserModel';


export class AuthService {

  public async login(userName: string, password: string): Promise<UserModel | undefined> {
    if (userName === 'user' && password === '1234') {
      return {
        userName: userName,
        email: 'bananas@bananamail.com'
      }
    } else {
      return undefined
    }
  }
}
