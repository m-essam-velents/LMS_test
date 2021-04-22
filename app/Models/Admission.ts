import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { HasOne } from '@ioc:Adonis/Lucid/Orm'
import Classroom from './Classroom'

export default class Admission extends BaseModel {
  public static table = 'classroom_admissions'
  @column({ isPrimary: true })
  public userId: number

  @column({ isPrimary: true })
  public classroomId: number

  @column()
  public currentStatus: 'pending' | 'accepted' | 'rejected'
  @column()
  public prevStatus: 'pending' | 'accepted' | 'rejected'
  @column()
  public rejectionReason: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
