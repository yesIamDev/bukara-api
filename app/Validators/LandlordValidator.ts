import { MARTITAL_STATUS, TID, TYPE_LANDLORD } from "App/Models/Landlord"
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GeneralCaseValidator from './GeneralCaseValidator'

export default class LandlordValidator extends GeneralCaseValidator {

  public v_create = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    lastname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    email: schema.string({ trim: true }, [rules.email()]),
    cardType: schema.enum(Object.values(TID)),
    cardTypeId: schema.string([rules.unique({ table: 'landlords', column: 'card_type_id' })]),
    maritalStatus: schema.enum(Object.values(MARTITAL_STATUS)),
    nationality: schema.string(),
    lastAdress: schema.string(),
    landlordType: schema.enum(Object.values(TYPE_LANDLORD)),

  })

  public v_update = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    lastname: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    email: schema.string({ trim: true }, [rules.email()]),
    cardType: schema.enum(Object.values(TID)),
    cardTypeId: schema.string(),
    maritalStatus: schema.enum(Object.values(MARTITAL_STATUS)),
    nationality: schema.string(),
    lastAdress: schema.string(),
  })

  public v_phones = schema.create({
    phones: schema.array([rules.minLength(1), rules.maxLength(3)]).members(
      schema.object().members({
        countryCode: schema.string([rules.regex(/^(\+?\d{1,3}|\d{1,4})$/)]),
        number: schema.string([rules.maxLength(10)]),
        running: schema.boolean(),
        landlordId: schema.string.optional(),
      })
    )
  })

  public v_phone = schema.create({
    countryCode: schema.string([rules.regex(/^(\+?\d{1,3}|\d{1,4})$/)]),
    number: schema.string([rules.maxLength(10)]),
    landlordId: schema.string.optional(),
  })

}
