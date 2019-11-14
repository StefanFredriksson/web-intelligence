const dataHelper = require('./dataHelpers')
const calcHelper = require('./calcHelpers')

/**
 * Gets the similarities between users based on the euclidian algorithm.
 * @param {String} userId The user to compare other users too.
 * @param {{}} data Data containing all the users, ratings and movies.
 */
function getEuclidianSimilarity (userId, data) {
  let similarities = []
  let users = dataHelper.getRatingForUsers(data)
  let mainUser = users.find(user => {
    return user.userId === userId
  })

  users.forEach(user => {
    if (user.userId !== userId) {
      let similarity = calcSimilarity(mainUser, user)
      similarities.push({ name: user.name, userId: user.userId, similarity })
    }
  })

  return similarities.sort((a, b) => {
    return b.similarity - a.similarity
  })
}

/**
 * Calculates the similarity between two users using the euclidian algorithm.
 * @param {{}} mainUser The user which was chosen on the client.
 * @param {{}} user User to compare to the main user.
 */
function calcSimilarity (mainUser, user) {
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

/**
 * Finds and returns a list of recommended movies for a certain user.
 * The list will be in descending order based on the scores.
 * @param {[{}]} similarities The similarities between users.
 * @param {{}} data Data containing all the users, movies and ratings.
 * @param {String} id The id of the chosen user.
 */
function getRecommendedMovies (similarities, data, id) {
  calcHelper.setWeightedScore(similarities, data, false)
  let weightedSums = calcHelper.getWeightedSums(data)
  let weightedSims = calcHelper.getSimilaritiesSum(data, similarities)
  let finalWeights = calcHelper.getFinalScores(weightedSums, weightedSims)
  calcHelper.removeAlreadyWatchedMovies(id, finalWeights, data)

  return finalWeights.sort((a, b) => {
    return b.score - a.score
  })
}

module.exports = {
  getEuclidianSimilarity,
  getRecommendedMovies
}
