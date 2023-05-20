import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class AppartementValidator extends GeneralCaseValidator {

  public v_create = schema.create({
    typeBienId: schema.string({ trim: true }, [rules.exists({ table: 'type_biens', column: 'id' })]),
    typeAppartementId: schema.string({ trim: true }, [rules.exists({ table: 'type_appartements', column: 'id' })]),
    designation: schema.string.optional({ trim: true }, [rules.minLength(5), rules.maxLength(250)]),
    description: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(250)]),
    features: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(250)]),
    number: schema.number.optional([rules.range(1, 100)]),
    price: schema.number([rules.range(30, 5000)]),
  })

  /**
   * Addresses
  */
  public v_address_create = schema.create({
    address: schema.object().members({
      appartement_id: schema.string.optional([rules.exists({ table: 'entreprises', column: 'id' })]),
      country: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
      town: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(50)]),
      city: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
      quarter: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
      street: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
      number: schema.number()
    })
  })

  public v_address_update = schema.create({
    country: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    town: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(50)]),
    city: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    quarter: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    street: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    number: schema.number()
  })
}
