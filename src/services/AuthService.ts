import { UserAttribute, UserModel } from '../models/Models';


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


  public async getUserAttributes(user: UserModel): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    result.push({
      Name: "description",
      Value: "Some information about some stuff"
    })
    result.push({
      Name: "more information",
      Value: "Some more information about some stuff"
    })
    return result

  }
}
