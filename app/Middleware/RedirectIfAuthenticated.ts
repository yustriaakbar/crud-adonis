import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectIfAuthenticated {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.check()
      return response.redirect().toRoute('users')
    } catch (error) {
      await next()
    }
  }
}
