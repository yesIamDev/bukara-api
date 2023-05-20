import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EntrepriseValidator {


  public v_entreprise_create = schema.create({
    designation: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(50)]),
    description: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(250)]),
    rccm: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(100)]),
    logo: schema.string.optional()
  })

  public v_update_entreprise = schema.create({
    designation: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(50)]),
    description: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(250)]),
    rccm: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(100)]),
  })


  public v_logo = schema.create({
    logo: schema.file({
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
      size: '2mb',
    }),
  })

  public v_address_create = schema.create({
    addresses: schema.array([rules.minLength(1),]).members(
      schema.object().members({
        entreprise_id: schema.string.optional([rules.exists({ table: 'entreprises', column: 'id' })]),
        country: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
        town: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(50)]),
        city: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
        quarter: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
        street: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
        number: schema.number()
      })
    )
  })

  public v_new_address = schema.create({
    entreprise_id: schema.string.optional([rules.exists({ table: 'entreprises', column: 'id' })]),
    country: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    town: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(50)]),
    city: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    quarter: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    street: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(50)]),
    number: schema.number()
  })

  public v_bank_account = schema.create({
    bank_accounts: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        entreprise_id: schema.string.optional([rules.exists({ table: 'entreprises', column: 'id' })]),
        bank: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(50)]),
        account_name: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(150)]),
        account_number: schema.number([rules.unique({ table: 'bank_accounts', column: 'account_number' })]),
      })
    )
  })

  public v_new_bank_account = schema.create({
    entreprise_id: schema.string.optional([rules.exists({ table: 'entreprises', column: 'id' })]),
    bank: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(50)]),
    account_name: schema.string({ trim: true }, [rules.minLength(4), rules.maxLength(150)]),
    account_number: schema.number([rules.unique({ table: 'bank_accounts', column: 'account_number' })]),
  })


  public v_delete = schema.create({
    id: schema.string([rules.uuid()])
  })

}
