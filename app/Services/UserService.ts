import BadRequestException from 'App/Exceptions/BadRequestException'
import UserRepo from 'App/Repos/UserRepo'

export default class UserService {
  private userRepo = new UserRepo()

  public async createUser(data: any) {
    const user = await this.userRepo.createOne(data)
    return user
  }

  public async editUser(data, id: number) {
    return await this.userRepo.editById(data, id)
  }
}
