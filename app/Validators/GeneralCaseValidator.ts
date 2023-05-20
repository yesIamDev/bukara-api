import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class GeneralCaseValidator {

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({})
  public gv_create = schema.create({
    designation: schema.string({ trim: true }, [rules.maxLength(4), rules.maxLength(15)]),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(25)]),
  })

  public gv_update = schema.create({
    id: schema.string([rules.uuid()]),
    designation: schema.string({ trim: true }, [rules.alpha(), rules.maxLength(4), rules.maxLength(15)]),
    description: schema.string.optional([rules.minLength(5), rules.maxLength(50)]),
  })


  public v_delete = schema.create({
    id: schema.string([rules.uuid()])
  })

  public v_id_param = schema.create({
    id: schema.string([rules.uuid()])
  })

  public v_profile = schema.create({
    profile: schema.file({
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
      size: '2mb',
    }),
  })

  public v_upload_multiple = schema.create({
    images: schema.array([rules.minLength(1), rules.maxLength(5)]).members(
      schema.file({
        extnames: ['jpg', 'png', 'gif', 'jpeg'],
        size: '20mb',
      })
    )
  })

  public v_multi_profile = schema.create({
    profile: schema.file({
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
      size: '20mb',
    }),
  })


  /* A validation for the login route. */
  public v_sign = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string(),
  })

  public v_change_psswd = schema.create({
    oldPassword: schema.string(),
    password: schema.string([rules.minLength(4), rules.confirmed()]),
  })

  public messages: CustomMessages = {}
}
