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

  /* only student */
  public async unEnrollFromClassroom({ params, session }: HttpContextContract) {
    return await this.classroomService.unEnrollFromClassroom(params.id, session.get('user').id)
  }

  public async admit({ session, params }: HttpContextContract) {
    return await this.classroomService.admit(params.id, session.get('user').id)
  }

  /* only instructor */

  public async acceptAdmission({ request }: HttpContextContract) {
    return await this.classroomService.acceptAdmission(
      request.input('classroomId'),
      request.input('userId')
    )
  }

  public async rejectAdmission({ request }: HttpContextContract) {
    return await this.classroomService.rejectAdmission(
      request.input('classroomId'),
      request.input('userId')
    )
  }
}
