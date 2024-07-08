const { User } = require('../models/User.js')

// importando módulo bcrypt
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
    async register(req, res) {
        try {
            // creamos el hash de forma síncrona
            // definimos el salt 
            const password = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({
                ...req.body,
                role: 'user',
                password: password
            })
            res.status(201).send({
                message: 'Usuario registrado con exito', user
            })
        } catch (error) {
            console.error(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
                // password: password
            })
            const token = jwt.sign({ _id: user._id }, jwt_secret)
            // esto no, porque es en tablas
            // Token.create({
            //     token,
            //     userId: user._id
            // })
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (user.tokens.length > 4) {
                user.tokens.shift()
            }
            user.tokens.push(token)
            // bcrypt login ¿?
            if (!isMatch) {
                return
            }
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