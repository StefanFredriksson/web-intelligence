const dataHelper = require('./dataHelpers')
const calcHelper = require('./calcHelpers')

function getPearsonScores (userId, data) {
  let scores = []
  let ratings = dataHelper.getRatingForUsers(data)
  let mainUser = ratings.find(user => {
    return user.userId === userId
  })

  ratings.forEach(rating => {
    if (rating.userId !== userId) {
      let score = calcPearsonScore(mainUser, rating)
      scores.push({ name: rating.name, userId: rating.userId, distance: score })
    }
  })

  return scores.sort((a, b) => {
    return b.distance - a.distance
  })
}

function calcPearsonScore (mainUser, user) {
  let mainSum = 0
  let sum = 0
  let mainSqSum = 0
  let sqSum = 0
  let pSum = 0
  let count = 0

  mainUser.ratings.forEach(mainRating => {
    user.ratings.forEach(rating => {
      if (mainRating.movieId === rating.movieId) {
        let rating1 = Number(mainRating.rating)
        let rating2 = Number(rating.rating)

        mainSum += rating1
        sum += rating2
        mainSqSum += Math.pow(rating1, 2)
        sqSum += Math.pow(rating2, 2)
        pSum += rating1 * rating2
        count++
      }
    })
  })

  if (count === 0) {
    return 0
  }

  let num = pSum - (mainSum * sum) / count
  let den = Math.sqrt(
    (mainSqSum - Math.pow(mainSum, 2) / count) *
      (sqSum - Math.pow(sum, 2) / count)
  )

  return num / den
}

function getRecommendedMovies (scores, data, id) {
  calcHelper.setWeightedScore(scores, data, true)
  let sums = calcHelper.getWeightedSums(data)
  let sims = calcHelper.getWeightedSimilarities(data, scores)
  let finalScores = calcHelper.getFinalWeights(sums, sims)
  calcHelper.removeAlreadyWatchedMovies(id, finalScores, data)

  return finalScores.sort((a, b) => {
    return b.weight - a.weight
  })
}

module.exports = {
  getPearsonScores,
  getRecommendedMovies
}
