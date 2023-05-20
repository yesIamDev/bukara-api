import { rules, schema } from '@ioc:Adonis/Core/Validator'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class RentalLocationValidator extends GeneralCaseValidator {
  constructor() {
    super()
  }

  public v_create = schema.create({
    appartementId: schema.string(),
    landlordId: schema.string([rules.exists({ table: 'landlords', column: 'id' })]),
    amount: schema.number(),
    numberOfHabitant: schema.number(),
    userId: schema.string.optional([rules.exists({ table: 'users', column: 'id' })]),
    // month: schema.number([rules.range(2, 6)])
  })

  // public v_guarantee = schema.create({
  //   month: schema.string([rules.exists({ table: 'appartements', column: 'id' })]),
  //   personneId: schema.string([rules.exists({ table: 'personnes', column: 'id' })]),
  //   amount: schema.number([rules.range(2, 6)]),
  //   usersId: schema.string([rules.exists({ table: 'users', column: 'id' })])
  // })

  public v_break = schema.create({
    landlordId: schema.string([rules.exists({ table: 'landlords', column: 'id' })]),
  })

  public v_guarantee = schema.create({
    month: schema.number([rules.range(2, 6)])
  })

}
