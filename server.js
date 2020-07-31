const express = require('express')
const api = require('./routes/api')
const staticRoutes = require('./routes/html')
const PORT = 7000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', api)
app.use('/', staticRoutes)

app.listen(PORT, () => console.info(`Server up on ${PORT}`))
