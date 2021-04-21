import CourseRepo from 'App/Repos/CourseRepo'

export default class CourseService {
  private courseRepo = new CourseRepo()
  async getAll() {
    return await this.courseRepo.getAll()
  }

  async createOne(data) {
    return await this.courseRepo.createOne(data)
  }

  async getOne(id: number) {
    return await this.courseRepo.getOne(id)
  }

  async updateOne(data, id: number) {
    return await this.courseRepo.updateOne(data, id)
  }

  async deleteOne(id: number) {
    return await this.courseRepo.deleteOne(id)
  }

  async enrollToCourse(courseId: number, userId: number) {
    return await this.courseRepo.enrollToCourse(courseId, userId)
  }
  async unEnrollFromCourse(courseId: number, userId: number) {
    return await this.courseRepo.unEnrollFromCourse(courseId, userId)
  }
}
