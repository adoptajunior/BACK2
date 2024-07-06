const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
    async register(req, res) {
        try {
            const user = await User.create(
                { ...req.body, role: 'user' }
            )
            res.status(201).send({ message: 'Usuario registrado con exito', user })
        } catch (error) {
            console.error(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            const token = jwt.sign({ _id: user._id }, jwt_secret)
            if (user.tokens.length > 4) user.tokens.shift()
            user.tokens.push(token)
            await user.save()
            res.send({ message: 'Bienvenid@ ' + user.name, token })
        } catch (error) {
            console.error(error)
        }
    },
    async getAll(req, res) {
        try {
            const users = await User.find()
            res.send(users)
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params._id)
            res.send({ user, message: 'User deleted' })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'ha habido un problema al intentar eliminar este usuario'
            })
        }
    }

}
module.exports = UserController