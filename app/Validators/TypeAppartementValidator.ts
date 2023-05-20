import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { EAppartementType } from 'App/Models/TypeAppartement'
import GeneralCaseValidator from './GeneralCaseValidator'


export default class TypeAppartementValidator extends GeneralCaseValidator {
  constructor() {
    super()
  }

  public v_create = schema.create({
    designation: schema.enum(Object.values(EAppartementType)),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(25)]),
  })

  public v_update = schema.create({
    id: schema.string([rules.uuid()]),
    designation: schema.enum(Object.values(EAppartementType)),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(50)]),
  })

}
