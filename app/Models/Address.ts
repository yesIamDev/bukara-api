import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import Entreprise from "./Entreprise"

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public entrepriseId: string

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
  public static async hashPassword(model: Address) {
    model.id = await generate.id()
  }

  @hasOne(() => Entreprise)
  public addresses: HasOne<typeof Entreprise>
}
