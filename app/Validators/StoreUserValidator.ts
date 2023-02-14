import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true}, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.unique({ table: 'users', column: 'username'}),
      rules.notIn(['admin', 'moderator'])
    ]),
    email: schema.string({ trim: true }, [rules.unique({table:'users', column: 'email'})]),
  })

  public messages: CustomMessages = {
    minLength: 'kurang dari 3',
    maxLength: 'max 50',
  }

}
