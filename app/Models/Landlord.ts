import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PersonnePhone from './LandlordPhone'
import generate from "App/Utils/Generator"
import { DateTime } from 'luxon'

export enum TID {
  VOTERS_CARD = "carte electeur",
  PASSPORT = `passport`,
  PERMIS = `permis`,
}

export enum MARTITAL_STATUS {
  MARRIED = "married",
  SINGLE = `single`
}

export enum TYPE_LANDLORD {
  PERSONNE_PHYSIQUE = "personne physique",
  ENTREPRISE = `entreprise`
}

export default class Landlord extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile: string

  @column()
  public cardType: string

  @column()
  public cardTypeId: string

  @column()
  public maritalStatus: string

  @column()
  public nationality: string

  @column()
  public lastAdress: string

  @column()
  public landlordType: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Landlord) {
    model.id = await generate.id()
  }

  @hasMany(() => PersonnePhone, {})
  public phones: HasMany<typeof PersonnePhone>

}
