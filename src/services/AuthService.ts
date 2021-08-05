import { UserAttribute, UserModel } from '../models/Models';






export class AuthService {


  public login = async (userName: string, password: string, allUsers: UserModel[]): Promise<UserModel | undefined> => {
    let loggedInUser = undefined
    allUsers.forEach(user => {
      if (user.userName === userName && user.password === password) {
        loggedInUser = user;
      }
    })
    if (loggedInUser) {
      return loggedInUser;
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
