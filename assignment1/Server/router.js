const router = require('express').Router()

const dataHelpers = require('./lib/dataHelpers')
const euclidian = require('./lib/euclidian')

router.route('/getdata').get(async (req, res) => {
  let data = await dataHelpers.getData()
  res.json({ message: data })
})

router.route('/findmovies/:userId').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let distance = euclidian.getEuclidianDistance(req.params.userId, data)
  console.log(distance)
  res.json({ message: 'hi' })
})

module.exports = router
