require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const port = process.env.app_port || 4000

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.options('*',cors())

const userRoutes = require('./routes/userRoutes')

app.use('/api/v1/',userRoutes)

const server = http.createServer(app)
server.listen(port, () => console.log(`server is up and running on port ${port}`))