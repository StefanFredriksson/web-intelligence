const dataHelper = require('./dataHelpers')
const calcHelper = require('./calcHelpers')

/**
 * Gets the similarities between the given user and the rest of the users.
 * @param {String} userId Id of the chosen user.
 * @param {{}} data Data containing all the users, movies and ratings.
 */
function getPearsonSimilarity (userId, data) {
  let scores = []
  let ratings = dataHelper.getRatingForUsers(data)
  let mainUser = ratings.find(user => {
    return user.userId === userId
  })

  ratings.forEach(rating => {
    if (rating.userId !== userId) {
      let score = calcPearsonSimilarity(mainUser, rating)
      scores.push({
        name: rating.name,
        userId: rating.userId,
        similarity: score
      })
    }
  })

  return scores.sort((a, b) => {
    return b.similarity - a.similarity
  })
}

/**
 * Calculates the simularity between two users.
 * Using the pearson algorithm.
 * @param {{}} mainUser The chosen user.
 * @param {{}} user User to compare with.
 */
function calcPearsonSimilarity (mainUser, user) {
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

/**
 * Retrieves and returns a list of recommended movies for the chosen user.
 * @param {[{}]} sims Simularities between users.
 * @param {{}} data Data containing all the users, movies and ratings.
 * @param {String} id Id of the chosen user.
 */
function getRecommendedMovies (sims, data, id) {
  calcHelper.setWeightedScore(sims, data, true)
  let wSums = calcHelper.getWeightedSums(data)
  let simsSum = calcHelper.getSimilaritiesSum(data, sims)
  let finalScores = calcHelper.getFinalScores(wSums, simsSum)
  calcHelper.removeAlreadyWatchedMovies(id, finalScores, data)

  return finalScores.sort((a, b) => {
    return b.score - a.score
  })
}

module.exports = {
  getPearsonSimilarity,
  getRecommendedMovies
}
