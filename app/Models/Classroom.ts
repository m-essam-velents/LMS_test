import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Admission from './Admission'
import { HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Classroom extends BaseModel {
  public static table = 'classrooms'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public status: 'active' | 'temporary_closed' | 'closed' | 'archived'

  @column()
  public type: 'onGround' | 'online'

  @column()
  public description: string

  @column()
  public admittedUsersCount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* relations */
  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'classroom_id',
    pivotRelatedForeignKey: 'user_id',
    relatedKey: 'id',
    pivotTable: 'classroom_enrollments',
  })
  public users: ManyToMany<typeof User>

  @hasMany(() => Admission, { foreignKey: 'classroom_id' })
  public admissions: HasMany<typeof Admission>
}
