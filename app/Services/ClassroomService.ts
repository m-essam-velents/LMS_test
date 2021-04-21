import ClassroomRepo from 'App/Repos/ClassroomRepo'

export default class ClassroomService {
  private classroomRepo = new ClassroomRepo()
  async getAll() {
    return await this.classroomRepo.getAll()
  }

  async createOne(data) {
    return await this.classroomRepo.createOne(data)
  }

  async getOne(id: number) {
    return await this.classroomRepo.getOne(id)
  }

  async updateOne(data, id: number) {
    return await this.classroomRepo.updateOne(data, id)
  }

  async deleteOne(id: number) {
    return await this.classroomRepo.deleteOne(id)
  }

  async enrollToClassroom(classroomId: number, userId: number) {
    return await this.classroomRepo.enrollToClassroom(classroomId, userId)
  }
  async unEnrollFromClassroom(classroomId: number, userId: number) {
    return await this.classroomRepo.unEnrollFromClassroom(classroomId, userId)
  }
}
