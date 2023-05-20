import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"

export default class BankAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public entrepriseId: string

  @column()
  public bank: string

  @column()
  public account_name: string

  @column()
  public account_number: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateId(model: BankAccount) {
    model.id = await generate.id()
  }
}
