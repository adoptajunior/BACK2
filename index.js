const express = require('express')
const app = express()

PORT = 3023

const { dbConnection } = require('./config/config')

app.use(express.json())
dbConnection()

// importando rutas 
app.use('/posts', require('./routes/posts'))
app.use('/users', require('./routes/users'))
// app.use('/orders', require('./routes/orders'))

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))