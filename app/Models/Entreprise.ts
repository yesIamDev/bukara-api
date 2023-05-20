import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import Address from './Address'
import BankAccount from './BankAccount'

export default class Entreprise extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public designation: string

  @column()
  public description: string

  @column()
  public rccm: string

  @column()
  public logo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Entreprise) {
    model.id = await generate.id()
  }

  @hasMany(() => Address, {})
  public addresses: HasMany<typeof Address>
  
  @hasMany(() => BankAccount, {})
  public banks: HasMany<typeof BankAccount>
}
