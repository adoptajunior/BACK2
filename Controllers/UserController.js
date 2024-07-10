const { User } = require('../models/User.js')

// importando módulo bcrypt
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
    async register(req, res, next) {
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
            // console.error(error)
            error.origin = 'usuario'
            next(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
                // password: password
            })
            if (!user) {
                return res.status(400).send({ message: 'Usuario o contraseña incorrectos' })
            }
            // BCRYPT
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).send({ message: 'Usuario o contraseña incorrectos' })
            }
            // TOKEN
            const token = jwt.sign({ _id: user._id }, jwt_secret)
            if (user.tokens.length > 4) {
                user.tokens.shift()
            }
            // Generamos el token al loguearnos correctamente con el método push()
            user.tokens.push(token)

            await user.save()

            res.send({ message: 'Bienvenid@ ' + user.name, user, token })

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
    },
    // PARA QUE SALGAN LOS POST CON LIKE DE CIERTO USER ¿?
    // BUSCAR CÓMO HACERLO...

    // async getInfo(req, res) {
    //     try {
    //         const user = await User.findById(req.user._id)
    //             .populate({
    //                 path: "orderIds",
    //                 populate: {
    //                     path: "productIds",
    //                 },
    //             })
    //             .populate("wishList")
    //         res.send(user)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

}
module.exports = UserController