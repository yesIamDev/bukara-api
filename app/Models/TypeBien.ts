import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"

export enum EBienType {
  HOUSE = 'maison',
  STUDIO = 'studio',
  APPARTEMENT = 'apartement',
}

export default class TypeBien extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public designation: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async generateId(model: TypeBien) {
    model.id = await generate.id()
  }
}
