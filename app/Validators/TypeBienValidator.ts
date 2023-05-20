import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { EBienType } from 'App/Models/TypeBien'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class TypeBienValidator extends GeneralCaseValidator {
  constructor() {
    super()
  }

  public v_create = schema.create({
    designation: schema.enum(Object.values(EBienType)),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(25)]),
  })

  public v_update = schema.create({
    id: schema.string([rules.uuid()]),
    designation: schema.enum(Object.values(EBienType)),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(50)]),
  })
}
