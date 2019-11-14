/**
 * Sets weighted scores (rating * similarity) for each user's ratings.
 * Can be used for both euclidian and pearson calculations.
 * @param {[{}]} similarities The similarity scores.
 * @param {{}} data The data containing all the ratings.
 * @param {Boolean} isPearson Checks to see which algorithm is being used.
 */
function setWeightedScore (similarities, data, isPearson) {
  similarities.forEach(similarity => {
    data.ratings.forEach(rating => {
      if (similarity.userId === rating.userId) {
        if (!isPearson || (isPearson && similarity.similarity >= 0)) {
          rating.weightedScore = similarity.similarity * rating.rating
        }
      }
    })
  })
}

/**
 * Calculates the sum of every movie's weighted score.
 * @param {{}} data The data containing all the weighted scores.
 */
function getWeightedSums (data) {
  let weightedSums = []
  data.movies.forEach(movie => {
    let sum = 0

    data.ratings.forEach(rating => {
      if (rating.movieId === movie.movieId && rating.weightedScore) {
        sum += rating.weightedScore
      }
    })

    weightedSums.push({
      title: movie.title,
      movieId: movie.movieId,
      weightedSum: sum
    })
  })

  return weightedSums
}

/**
 * Calculates the sum of similarities for each movie.
 * @param {{}} data The data containing all the movies.
 * @param {[{}]} similarities The data containing all the similarities.
 */
function getSimilaritiesSum (data, similarities) {
  let simsSum = []

  data.movies.forEach(movie => {
    let sum = 0
    data.ratings.forEach(rating => {
      if (rating.movieId === movie.movieId && rating.weightedScore) {
        similarities.forEach(sim => {
          if (sim.userId === rating.userId) {
            sum += sim.similarity
          }
        })
      }
    })

    simsSum.push({
      title: movie.title,
      movieId: movie.movieId,
      simSum: sum
    })
  })

  return simsSum
}

/**
 * Calculates the final score used when determining which movie to recommend.
 * @param {[{}]} weightedScores Data containing all the weighted score sums.
 * @param {[{}]} simsSum Data containing the sum of all the similarities for each movie.
 */
function getFinalScores (weightedScores, simsSum) {
  let finalScores = []

  weightedScores.forEach(score => {
    simsSum.forEach(sim => {
      if (score.movieId === sim.movieId) {
        let finalScore = 0

        if (sim.weightedSim !== 0) {
          finalScore = score.weightedSum / sim.simSum
        }

        finalScores.push({
          title: score.title,
          movieId: score.movieId,
          score: finalScore
        })
      }
    })
  })

  return finalScores
}

/**
 * Removes movies from the recommended list if the user has already watched them.
 * @param {String} id The id of the user.
 * @param {[{}]} finalScores The list of recommended movies.
 * @param {{}} data Data containing which movies the user has watched/rated.
 */
function removeAlreadyWatchedMovies (id, finalScores, data) {
  data.ratings.forEach(rating => {
    for (let i = finalScores.length - 1; i >= 0; i--) {
      if (rating.userId === id && rating.movieId === finalScores[i].movieId) {
        finalScores.splice(i, 1)
      }
    }
  })
}

module.exports = {
  getWeightedSums,
  getSimilaritiesSum,
  getFinalScores,
  removeAlreadyWatchedMovies,
  setWeightedScore
}
