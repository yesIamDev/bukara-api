import { BaseModel, BelongsTo, afterCreate, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import appartement from 'App/Services/Appartement.service'
import location from 'App/Services/Location.service'
import recovery from 'App/Services/Recovery.service'
import generate from "App/Utils/Generator"
import Appartement from './Appartement'
import Landlord from './Landlord'
import { DateTime } from 'luxon'
import moment from 'moment'
import User from './User'

export default class RentalContrat extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'appartement' })
  public appartementId: string

  @column({ serializeAs: 'landlord' })
  public landlordId: string

  @column()
  public amount: number

  @column()
  public currency: string

  @column()
  public current: boolean

  @column()
  public numberOfHabitant: number

  @column()
  public status: boolean

  @column({ serializeAs: 'user' })
  public userId: string

  @column.dateTime({ autoCreate: true })
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(model: RentalContrat) {
    model.id = await generate.id()
  }

  /* It's a hook that is called after the creation of a new rentalContrat. */
  @afterCreate()
  public static async updateStatus(model: RentalContrat) {
    //1
    /* It's updating the status of the appartement to true. */
    await appartement.Instance.update(model.appartementId, { status: true })
    //2
    /* It's updating the status of
    the appartement to true. */
    const month = location.guranteeMoth
    await location.Instance.registreGuarantee({ amount: model.amount, month, rentalContratId: model.id })
    //3
    const nextDate = moment().add(1, 'months')
    moment.locale('fr');
    const month_label = moment().add(1, 'months').format('MMMM')
    // var nextDate = moment().add(1, 'months')

    console.log(`Next month: ${moment().add(1, 'months')}`)
    await recovery.Instance.registre({
      date_recovery: nextDate,
      labelMonth: `${month_label}-${nextDate.year()}`,
      labelStr: `paiement loyer du mois de ${month_label}.`,
      rentalContratId: model.id
    })
  }

  @belongsTo(() => User, {})
  public user: BelongsTo<typeof User>

  @belongsTo(() => Appartement, {})
  public appartement: BelongsTo<typeof Appartement>

  @belongsTo(() => Landlord, {})
  public landlord: BelongsTo<typeof Landlord>
}
