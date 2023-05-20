import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from 'App/Utils/Generator'
import { DateTime } from 'luxon'

export default class ImageAppartement extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public appartementId: string

  @column({ serializeAs: 'url' })
  public url: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: ImageAppartement) {
    model.id = await generate.id()
  }


}
