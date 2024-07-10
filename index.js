const express = require('express')
const app = express()

const PORT = 3003

const { dbConnection } = require('./config/config')

// middleware:
const { typeError } = require('./Middlewares/errors')

app.use(express.json())
dbConnection()

// importando rutas 
app.use('/posts', require('./routes/posts'))
app.use('/users', require('./routes/users'))
// app.use('/orders', require('./routes/orders'))

app.use(typeError)

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))