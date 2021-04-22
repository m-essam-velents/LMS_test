import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

export default class Acl {
  public async handle(
    { session }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[]
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = session.get('user')
    if (!user || !allowedRoles.includes(user.type.toString()))
      throw new UnAuthorizedException('this action is not allowed')
    await next()
  }
}
