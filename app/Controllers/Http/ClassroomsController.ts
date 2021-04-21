import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import ClassroomService from 'App/Services/ClassroomService'
import ClassroomValidator from 'App/Validators/CourseValidator'

export default class ClassroomsController {
  private classroomService = new ClassroomService()
  public async index() {
    const courses = await this.classroomService.getAll()
    return courses
  }
  public async store(ctx: HttpContextContract) {
    const { validate } = new ClassroomValidator(ctx)
    await validate()
    const { body } = ctx.request.toJSON()
    return await this.classroomService.createOne(body)
  }
  public async show({ params }: HttpContextContract) {
    return await this.classroomService.getOne(params.id)
  }
  public async update(ctx: HttpContextContract) {
    const { validate } = new ClassroomValidator(ctx)
    await validate()
    const { body } = ctx.request.toJSON()
    return await this.classroomService.updateOne(body, ctx.params.id)
  }
  public async destroy({ params }: HttpContextContract) {
    return await this.classroomService.deleteOne(params.id)
  }
  public async enrollToClassroom({ session, params }: HttpContextContract) {
    return await this.classroomService.enrollToClassroom(params.id, session.get('user').id)
  }
  public async unEnrollFromClassroom({ session, params }: HttpContextContract) {
    return await this.classroomService.unEnrollFromClassroom(params.id, session.get('user').id)
  }
  public async admit({ session, params }: HttpContextContract) {
    const { id, type } = session.get('user') || {}
    // check if user is student or not
    if (type !== 1) {
      throw new UnAuthorizedException()
    }
    return await this.classroomService.admit(params.id, id)
  }
}
