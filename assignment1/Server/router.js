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
    let sims = euclidian.getEuclidianSimilarity(req.params.userId, data)
    sims = dataHelpers.trimList(sims, req.params.count)

    res.json({ message: sims })
  })

router
  .route('/euclidian/recommendedmovies/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let similarity = euclidian.getEuclidianSimilarity(req.params.userId, data)
    let recMovies = euclidian.getRecommendedMovies(
      similarity,
      data,
      req.params.userId
    )
    recMovies = dataHelpers.trimList(recMovies, req.params.count)

    res.json({ message: recMovies })
  })

router.route('/pearson/matchingusers/:userId&:count').get(async (req, res) => {
  let data = await dataHelpers.getData()
  let sims = pearson.getPearsonSimilarity(req.params.userId, data)
  sims = dataHelpers.trimList(sims, req.params.count)

  res.json({ message: sims })
})

router
  .route('/pearson/recommendedmovies/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let sims = pearson.getPearsonSimilarity(req.params.userId, data)
    let recMovies = pearson.getRecommendedMovies(sims, data, req.params.userId)
    recMovies = dataHelpers.trimList(recMovies, req.params.count)

    res.json({ message: recMovies })
  })

router
  .route('/item-based/recommendedMovies/:userId&:count')
  .get(async (req, res) => {
    let data = await dataHelpers.getData()
    let sims = itemBased.getSimilarities(data, req.params.userId)
    let recMovies = itemBased.getRecommendedMovies(
      sims,
      data,
      req.params.userId
    )
    recMovies = dataHelpers.trimList(recMovies, req.params.count)

    res.json({ message: recMovies })
  })

module.exports = router
