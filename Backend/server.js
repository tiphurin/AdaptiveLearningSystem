require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { notFound, handleError } = require('./middlewares')
const routes = require('./routes')
const logger = require('./config/logger')

const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.use(logger)
app.use(cookieParser());

app.use('/api',routes)

app.use(notFound)
app.use(handleError)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

