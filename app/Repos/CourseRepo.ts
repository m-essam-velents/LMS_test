import Course from 'App/Models/Course'

export default class CourseRepo {
  async getAll() {
    return await Course.all()
  }

  async createOne(data) {
    return await Course.create({
      name: data.name,
      price: data.price,
      status: data.status,
      type: data.type,
      description: data.description,
    })
  }

  async getOne(id: number) {
    return await Course.findOrFail(id)
  }

  async updateOne(data, id: number) {
    const course = await Course.findOrFail(id)
    course.name = data.name
    course.price = data.price
    course.status = data.status
    course.type = data.type
    course.description = data.description

    return await course.save()
  }

  async deleteOne(id: number) {
    const course = await Course.findOrFail(id)
    await course.delete()
  }
}
