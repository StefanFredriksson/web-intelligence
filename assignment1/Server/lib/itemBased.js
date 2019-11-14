const calcHelper = require('./calcHelpers')

/**
 * Finds the similarities between movies which the chosen
 * user has watched and the rest of the movies.
 * @param {{}} data Data containing all the users, movies and ratings.
 * @param {String} id Id of the chosen user.
 */
function getSimilarities (data, id) {
  let ratings = getRatingForMovies(data)
  let user = getMoviesWatched(data, id)
  user = getRatingsForUsersMovies(user, ratings)

  user.forEach(userRating => {
    let sims = []
    ratings.forEach(movieRating => {
      if (userRating.movieId !== movieRating.movieId) {
        let sim = calcSimilarity(userRating, movieRating)
        sims.push({
          title: movieRating.title,
          movieId: movieRating.movieId,
          similarity: sim
        })
      }
    })

    userRating.similarities = sims
  })

  return user
}

/**
 * Retrieves the recommended movies for a given user.
 * @param {[{}]} sims Similarities between movies.
 * @param {{}} data Data containing all the users, movies and ratings.
 * @param {String} id Id of the chosen user.
 */
function getRecommendedMovies (sims, data, id) {
  let recMovies = []
  let sums = getSums(sims, data)

  sums.forEach(sum => {
    let finalScore = sum.scoreSum / sum.scoreSim

    recMovies.push({
      title: sum.title,
      movieId: sum.movieId,
      score: finalScore
    })
  })

  calcHelper.removeAlreadyWatchedMovies(id, recMovies, data)

  return recMovies.sort((a, b) => {
    return b.score - a.score
  })
}

/**
 * Calculates the weighted score sum as well as the similarity sum for each movie.
 * @param {[{}]} sims Similarities between movies.
 * @param {{}} data Data containing all the users, movies and ratings.
 */
function getSums (sims, data) {
  let sums = []

  data.movies.forEach(movie => {
    let scoreSum = 0
    let scoreSim = 0
    sims.forEach(sim => {
      sim.similarities.forEach(similarity => {
        if (similarity.movieId === movie.movieId) {
          scoreSum += sim.rating * similarity.similarity
          scoreSim += similarity.similarity
        }
      })
    })

    sums.push({
      title: movie.title,
      movieId: movie.movieId,
      scoreSum,
      scoreSim
    })
  })

  return sums
}

/**
 * Gets the ratings from every user for each movie which the chosen user has watched/rated.
 * @param {[{}]} user The ratings which the chosen user has made.
 * @param {[{}]} ratings The ratings made by every user for each movie.
 */
function getRatingsForUsersMovies (user, ratings) {
  let tempUser = []

  user.forEach(userRating => {
    ratings.forEach(rating => {
      if (rating.movieId === userRating.movieId) {
        tempUser.push({
          title: rating.title,
          movieId: rating.movieId,
          rating: userRating.rating,
          ratings: rating.ratings
        })
      }
    })
  })

  return tempUser
}

/**
 * Finds the ratings made by every user for each movie.
 * @param {{}} data Data containing all the users, movies and ratings.
 */
function getRatingForMovies (data) {
  let movies = []

  data.movies.forEach(movie => {
    let ratings = data.ratings.filter(value => {
      if (movie.movieId === value.movieId) {
        return value
      }
    })

    movies.push({ title: movie.title, movieId: movie.movieId, ratings })
  })

  return movies
}

/**
 * Gets the movies rated/watched by the given user.
 * @param {{}} data Data containing all the users, movies and ratings.
 * @param {String} id Id of the chosen user.
 */
function getMoviesWatched (data, id) {
  return data.ratings.filter(value => {
    if (value.userId === id) {
      return value
    }
  })
}

/**
 * Calculates the similarities between movies using the euclidian algorithm.
 * @param {{}} userRating One of the movies the chosen user has watched/rated.
 * @param {{}} movieRating Movie to compare with.
 */
function calcSimilarity (userRating, movieRating) {
  let similarity = 0
  let count = 0

  userRating.ratings.forEach(uRating => {
    movieRating.ratings.forEach(rating => {
      if (rating.userId === uRating.userId) {
        similarity += Math.pow(
          Number(uRating.rating) - Number(rating.rating),
          2
        )
        count++
      }
    })
  })

  return count === 0 ? 0 : 1 / (1 + similarity)
}

module.exports = {
  getSimilarities,
  getRecommendedMovies
}
