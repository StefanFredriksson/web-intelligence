const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.port || 4000
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', require('./router'))

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
