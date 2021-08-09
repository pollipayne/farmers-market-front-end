import { UserAttribute, UserModel } from '../models/Models';






export class AuthService {


  public login = async (email: string, password: string, allUsers: UserModel[]): Promise<UserModel | undefined> => {
    let loggedInUser = undefined
    allUsers.forEach(user => {
      if (user.email === email && user.password === password) {
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
    if (user.isLoggedIn === false) {
      result.push({
        Name: "Welcome to My Farmers Market!",
        Value: "Please log in to see your markets!"
      })
    } else {
      result.push({
        Name: `Welcome to your favorite markets ${user.userName}!`,
        Value: "Add your favorite markets, search for markets near you, or click on a market you have favorited to see what vendors you loved! "
      })
    }
    return result

  }
}
