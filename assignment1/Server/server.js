const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.port || 3000
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
