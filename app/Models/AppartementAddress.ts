import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import { DateTime } from 'luxon'

export default class AppartementAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public appartementId: string

  @column()
  public country: string

  @column()
  public town: string

  @column()
  public city: string

  @column()
  public quarter: string

  @column()
  public street: string

  @column()
  public number: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: AppartementAddress) {
    model.id = await generate.id()
  }

}
