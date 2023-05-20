import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import { DateTime } from 'luxon'

export default class LandlordPhone extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'landlordId' })
  public landlordId: string

  @column({ serializeAs: 'countryCode' })
  public countryCode: string

  @column()
  public number: string

  @column()
  public running: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: LandlordPhone) {
    model.id = await generate.id()
  }

}


