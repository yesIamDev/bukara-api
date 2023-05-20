import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import generate from "App/Utils/Generator"
import RentalContrat from './RentalContrat'
import { DateTime } from 'luxon'

export default class Recovery extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'rentalContrat' })
  public rentalContratId: string

  @column()
  public labelMonth: string

  @column()
  public labelStr: string

  @column()
  public dateRecovery: moment.Moment

  @column()
  public status: Boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: Recovery) {
    model.id = await generate.id()
  }

  @belongsTo(() => RentalContrat, {})
  public rentalContrat: BelongsTo<typeof RentalContrat>

  /**
 * Serialize the `$extras` object as it is
 */
  public serializeExtras = true
  // () {
  //   return {
  //     rendir: this.$extras.rendir,
  //     numberOfRides: this.$extras.size,
  //   }
  // }
}
