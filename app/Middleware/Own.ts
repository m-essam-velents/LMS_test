import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

export default class Own {
  public async handle({ session }: HttpContextContract, next: () => Promise<void>, id: string) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = session.get('user')
    if (!user || user.id !== id) throw new UnAuthorizedException()
    await next()
  }
}
