import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import UserService from 'App/Services/UserService'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  private userService = new UserService()
  public async register(ctx: HttpContextContract) {
    const { validate } = new RegisterValidator(ctx)

    await validate()
    try {
      const { body } = ctx.request.toJSON()
      const user = await this.userService.createUser(body)
      return user
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  public async login(ctx: HttpContextContract) {
    const { validate } = new LoginValidator(ctx)
    await validate()
    const user = await ctx.auth.attempt(ctx.request.input('email'), ctx.request.input('password'))
    ctx.session.put('user', { id: user.id, email: user.email, type: user.type })
    ctx.response.json(user)
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
