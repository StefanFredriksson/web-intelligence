const dataHelper = require('./dataHelpers')
const calcHelper = require('./calcHelpers')

function getEuclidianDistance (userId, data) {
  let similarities = []
  let users = dataHelper.getRatingForUsers(data)
  let mainUser = users.find(user => {
    return user.userId === userId
  })

  users.forEach(user => {
    if (user.userId !== userId) {
      let distance = calcDistance(mainUser, user)
      similarities.push({ name: user.name, userId: user.userId, distance })
    }
  })

  return similarities.sort((a, b) => {
    return b.distance - a.distance
  })
}

function calcDistance (mainUser, user) {
  let similarity = 0
  let count = 0

  mainUser.ratings.forEach(mainRating => {
    user.ratings.forEach(rating => {
      if (mainRating.movieId === rating.movieId) {
        similarity += Math.pow(
          Number(mainRating.rating) - Number(rating.rating),
          2
        )
        count++
      }
    })
  })

  return count === 0 ? 0 : 1 / (1 + similarity)
}

function getRecommendedMovies (similarities, data, id) {
  calcHelper.setWeightedScore(similarities, data, false)
  let weightedSums = calcHelper.getWeightedSums(data)
  let weightedSims = calcHelper.getWeightedSimilarities(data, similarities)
  let finalWeights = calcHelper.getFinalWeights(weightedSums, weightedSims)
  calcHelper.removeAlreadyWatchedMovies(id, finalWeights, data)

  return finalWeights.sort((a, b) => {
    return b.weight - a.weight
  })
}

module.exports = {
  getEuclidianDistance,
  getRecommendedMovies
}
