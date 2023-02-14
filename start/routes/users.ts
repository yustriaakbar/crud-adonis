import Route from '@ioc:Adonis/Core/Route'

export default function userRoutes() {
Route.group(() => {
    Route.get('/', 'UsersController.index').as('users')
    Route.get('/create', 'UsersController.create').as('users.create')
    Route.post('/store', 'UsersController.store').as('users.store')
    Route.get('/edit/:id', 'UsersController.edit').as('users.edit')
    Route.post('/update/:id', 'UsersController.update').as('users.update')
    Route.get('/delete/:id', 'UsersController.delete').as('users.delete')
  }).prefix('users').middleware('auth')
}