import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditUserValidator {
  constructor(protected ctx: HttpContextContract) {}

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
  public schema = schema.create({
    firstName: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(30),
      rules.required(),
    ]),
    lastName: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(30),
      rules.required(),
    ]),
    gender: schema.enum(['male', 'female'], [rules.required()]),
    phone: schema.string.optional({ trim: true }, [rules.mobile()]),
    avatar: schema.string.optional({ trim: true }, [rules.url()]),
    defaultPaymentMethod: schema.string.optional(),
    facebook: schema.string.optional({}, [rules.url()]),
    twitter: schema.string.optional({}, [rules.url()]),
    instagram: schema.string.optional({}, [rules.url()]),
    linkedin: schema.string.optional({}, [rules.url()]),
    extra_link: schema.string.optional({}, [rules.url()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}

  public validate = async () => {
    await this.ctx.request.validate({ schema: this.schema })
  }
}
