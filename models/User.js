const mongoose = require('mongoose')

// Actualizamos el modelo Post ( si no da error )
const ObjectId = mongoose.SchemaTypes.ObjectId

const UserSchema = new mongoose.Schema(
    {
        // name: String,
        // email: String,
        // password: String,
        // age: Number,

        // VALIDACIÓN DE CAMPOS
        name: {
            type: String,
            required: [true, 'Por favor rellena tu nombre'],
        },
        email: {
            type: String,
            match: [/.+\@.+\..+/, 'Este correo no es válido'],
            unique: true,
            required: [true, 'Por favor rellena tu correo'],
        },
        password: {
            type: String,
            required: [true, 'Por favor rellena tu contraseña'],
        },
        age: {
            type: Number,
            required: [true, 'Por favor rellena tu edad'],
        },
        // -----------
        role: String,
        tokens: [],
        userLikes: [{ type: ObjectId, ref: 'Post' }],
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
