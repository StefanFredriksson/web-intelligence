const express = require('express')
const cors = require('cors')
const port = process.env.port || 3000
const app = express()

app.use(cors())
app.use('/', require('./router'))

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
