import Classroom from 'App/Models/Classroom'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Course from './Classroom'
import Admission from './Admission'

enum UserTypes {
  Instructor,
  Student,
}
export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public type: UserTypes

  @column({ serializeAs: null })
  public ssn: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public gender: 'male' | 'female'

  @column()
  public phone: string

  @column()
  public avatar: string

  @column()
  public defaultPaymentMethod: string

  @column()
  public facebook: string
  @column()
  public twitter: string
  @column()
  public instagram: string
  @column()
  public linkedin: string
  @column()
  public extra_link: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* relations */
  @manyToMany(() => Course, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'course_id',
    relatedKey: 'id',
    pivotTable: 'course_enrollments',
  })
  public courses: ManyToMany<typeof Course>

  @manyToMany(() => Classroom, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'classroom_id',
    relatedKey: 'id',
    pivotTable: 'classroom_enrollments',
  })
  public classrooms: ManyToMany<typeof Classroom>

  @hasMany(() => Admission)
  public admissions: HasMany<typeof Admission>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
