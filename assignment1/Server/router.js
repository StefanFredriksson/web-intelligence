const router = require('express').Router()
const path = require('path')
const dataHelpers = require('./lib/dataHelpers')

router.route('/getData').get(async (req, res) => {
  console.log('called')
  let destination = path.join(__dirname, 'data', 'movies_large')
  let data = await dataHelpers.getData(destination)
  res.json({ message: data })
})

module.exports = router
