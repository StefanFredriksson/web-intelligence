const router = require('express').Router()

const dataHelpers = require('./lib/dataHelpers')
const euclidian = require('./lib/euclidian')
const pearson = require('./lib/pearson')
const itemBased = require('./lib/itemBased')

router.route('/getdata').get(async (req, res) => {
  let data = await dataHelpers.getData()
  res.json({ message: data })
})

router
  .route('/euclidian/matchingusers/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let distance = euclidian.getEuclidianDistance(req.params.userId, data)

    if (req.params.count < distance.length) {
      distance = distance.slice(0, req.params.count)
    }

    res.json({ message: distance })
  })

router
  .route('/euclidian/recommendedmovies/:userId&:count')
  .get(async (req, res) => {
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

router.route('/pearson/matchingusers/:userId&:count').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let scores = pearson.getPearsonScores(req.params.userId, data)

  if (scores.length > req.params.count) {
    scores = scores.slice(0, req.params.count)
  }

  res.json({ message: scores })
})

router
  .route('/pearson/recommendedmovies/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let scores = pearson.getPearsonScores(req.params.userId, data)
    let recMovies = pearson.getRecommendedMovies(
      scores,
      data,
      req.params.userId
    )

    if (req.params.count < recMovies.length) {
      recMovies = recMovies.slice(0, req.params.count)
    }

    res.json({ message: recMovies })
  })

router
  .route('/item-based/recommendedMovies/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let sims = itemBased.getSimilarities(data, req.params.userId)
    let recMovies = itemBased.getRecommendedMovies(sims, data, req.params.id)

    res.json({ message: [] })
  })

module.exports = router
