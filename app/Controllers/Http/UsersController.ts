import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import EditUserValidator from 'App/Validators/EditUserValidator'
import _ from 'lodash'
export default class UsersController {
  private userService = new UserService()
  public async edit(ctx: HttpContextContract) {
    const { validate } = new EditUserValidator(ctx)
    await validate()
    const { body } = ctx.request.toJSON()
    const user = await this.userService.editUser(body, ctx.session.get('user').id)
    return user
  }
}
