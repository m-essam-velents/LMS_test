import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
}
