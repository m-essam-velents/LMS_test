import Classroom from 'App/Models/Classroom'

export default class ClassroomRepo {
  async getAll() {
    return await Classroom.all()
  }

  async createOne(data) {
    return await Classroom.create({
      name: data.name,
      price: data.price,
      status: data.status,
      type: data.type,
      description: data.description,
    })
  }

  async getOne(id: number) {
    return await Classroom.findOrFail(id)
  }

  async updateOne(data, id: number) {
    const classroom = await Classroom.findOrFail(id)
    classroom.name = data.name
    classroom.price = data.price
    classroom.status = data.status
    classroom.type = data.type
    classroom.description = data.description

    return await classroom.save()
  }

  async deleteOne(id: number) {
    const classroom = await Classroom.findOrFail(id)
    await classroom.delete()
  }
}
