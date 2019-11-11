const router = require('express').Router()

const dataHelpers = require('./lib/dataHelpers')
const euclidian = require('./lib/euclidian')

router.route('/getdata').get(async (req, res) => {
  let data = await dataHelpers.getData()
  res.json({ message: data })
})

router.route('/findmatchingusers/:userId&:count').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let distance = euclidian.getEuclidianDistance(req.params.userId, data)
  res.json({ message: distance.slice(0, req.params.count) })
})

router.route('/findrecommendedmovies/:userId&:count').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let distance = euclidian.getEuclidianDistance(req.params.userId, data)
  euclidian.getRecommendedMovies(distance, data)
  res.json({ message: 'hi' })
})

module.exports = router
