import Route from '@ioc:Adonis/Core/Route'

export default function authRoutes() {
Route.group(() => {
    Route.get('/login', 'AuthController.index').as('auth').middleware('RedirectIfAuthenticated')
    Route.post('/login', 'AuthController.login').as('auth.login').middleware('RedirectIfAuthenticated')
    Route.get('/logout', 'AuthController.logout').as('auth.logout')
  }).prefix('auth')
}