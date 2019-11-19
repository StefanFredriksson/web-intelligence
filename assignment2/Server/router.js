const router = require('express').Router()
const dataFuncs = require('./lib/readData')

router.get('/getdata', async (req, res) => {
  const data = await dataFuncs.getData()
  const blogs = dataFuncs.extractBlogs(data)
  res.json({ message: blogs })
})

module.exports = router
