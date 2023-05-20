import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class UserValidator extends GeneralCaseValidator {

  constructor() {
    super()
  }

  public v_create = schema.create({
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.minLength(8), rules.confirmed()])
  })

  public v_update = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    lastname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    email: schema.string({ trim: true }, [rules.email()]),
    country_code: schema.string([rules.regex(/^(\+?\d{1,3}|\d{1,4})$/)]),
    phone_number: schema.string([rules.maxLength(10)]),
  })


  public messages: CustomMessages = {}
}
