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

  if (req.params.count < distance.length) {
    distance = distance.slice(0, req.params.count)
  }

  res.json({ message: distance })
})

router.route('/findrecommendedmovies/:userId&:count').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let distance = euclidian.getEuclidianDistance(req.params.userId, data)
  let recMovies = euclidian.getRecommendedMovies(
    distance,
    data,
    req.params.userId
  )

  if (req.params.count < recMovies.length) {
    recMovies = recMovies.slice(0, req.params.count)
  }

  res.json({ message: recMovies })
})

module.exports = router
