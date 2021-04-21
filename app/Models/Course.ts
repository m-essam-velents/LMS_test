import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class Course extends BaseModel {
  public static table = 'courses'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* relations */
  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'course_id',
    pivotRelatedForeignKey: 'user_id',
    relatedKey: 'id',
    pivotTable: 'course_enrollments',
  })
  public users: ManyToMany<typeof User>
}
