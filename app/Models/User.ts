import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column()
  public country_code: string

  @column()
  public phone_number: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    user.id = await generate.id()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
