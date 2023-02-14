import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'

export default class UsersController {
    public async index({ response, view }: HttpContextContract){
        try {
            const users = await User.all()

            return view.render('user/index', {users})
        } catch (err) {
            response.status(err.status).send(err.message)
        }
    }

    public create({view}) {
        return view.render('user/create')
    }

    public async store({request, response, session}: HttpContextContract){
        try {
            await request.validate(StoreUserValidator)
            await User.create({
                username: request.input('username'),
                email: request.input('email'),
                password: request.input('password'),
            })

            session.flash({ success: 'Data Successfully Created!' })
            return response.redirect().toRoute('users')
        } catch (err) {
            session.flash({ error: err.messages })
            return response.redirect().toRoute('users.create')
        }
    } 
    
    public async edit({ response, view, params }: HttpContextContract){
        try {
            const id = params.id
            const user = await User.find(id)

            return view.render('user/edit', {user})
        } catch (err) {
            response.status(err.status).send(err.message)
        }
    }

    public async update({request, response, params}: HttpContextContract){
        try {
            const input = request.only(['username', 'email'])
            const user = await User.findOrFail(params.id)
            user?.merge(input)
            await user?.save()

            return response.redirect().toRoute('users')
        } catch (err) {
            response.status(err.status).send(err.message)
        }
    } 

    public async delete({ response, params }){
        try {
            const id = params.id
            const user = await User.findOrFail(id)
            await user.delete()

            return response.redirect().toRoute('users')
        } catch (err) {
            response.status(err.status).send(err.message)
        }
    }
}
