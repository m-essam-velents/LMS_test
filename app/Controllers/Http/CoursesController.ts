import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CourseService from 'App/Services/CourseService'
import CourseValidator from 'App/Validators/CourseValidator'

export default class CoursesController {
  private courseService = new CourseService()
  public async index() {
    const courses = await this.courseService.getAll()
    return courses
  }
  public async store(ctx: HttpContextContract) {
    const { validate } = new CourseValidator(ctx)
    await validate()
    const { body } = ctx.request.toJSON()
    return await this.courseService.createOne(body)
  }
  public async show({ params }: HttpContextContract) {
    return await this.courseService.getOne(params.id)
  }
  public async update(ctx: HttpContextContract) {
    const { validate } = new CourseValidator(ctx)
    await validate()
    const { body } = ctx.request.toJSON()
    return await this.courseService.updateOne(body, ctx.params.id)
  }
  public async destroy({ params }: HttpContextContract) {
    return await this.courseService.deleteOne(params.id)
  }
}
