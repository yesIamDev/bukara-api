import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MobilePhone extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public personneId: string

  @column()
  public countyCode: string

  @column()
  public number: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
