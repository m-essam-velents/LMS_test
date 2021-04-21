import Admission from 'App/Models/Admission'
import Classroom from 'App/Models/Classroom'
import User from 'App/Models/User'

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

  async enrollToClassroom(classroomId: number, userId: number) {
    const [classroom, user] = await Promise.all([
      Classroom.findOrFail(classroomId),
      User.findOrFail(userId),
    ])
    await user.related('classrooms').sync([classroom.id])
  }

  async unEnrollFromClassroom(classroomId: number, userId: number) {
    const [classroom, user] = await Promise.all([
      Classroom.findOrFail(classroomId),
      User.findOrFail(userId),
    ])
    await user.related('classrooms').detach([classroom.id])
  }

  async createAdmission(classroomId, userId) {
    const [classroom, user] = await Promise.all([
      Classroom.findOrFail(classroomId),
      User.findOrFail(userId),
    ])
    return await user.related('admissions').create({ userId: user.id, classroomId: classroom.id })
  }
  async updateAdmission(data, classroomId, userId) {
    const admission = await Admission.query()
      .where('classroom_id', classroomId)
      .andWhere('user_id', userId)
      .firstOrFail()

    admission.prevStatus = admission.currentStatus
    admission.currentStatus = data.currentStatus
    admission.rejectionReason = data.rejectionReason

    return await admission.save()
  }
}
