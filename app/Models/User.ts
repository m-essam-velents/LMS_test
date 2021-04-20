import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

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

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
