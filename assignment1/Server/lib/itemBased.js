const dataHelper = require('./dataHelpers')

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
          distance: sim
        })
      }
    })

    userRating.similarities = sims
  })

  return user
}

function getRecommendedMovies (sims, data, id) {
  let recMovies = []
}

function setWeightedScores (sims, data) {
  data.movies.forEach(movie => {
    sims.forEach(sim => {
      sim.similarities.forEach(similarity => {
        if (similarity.movieId === movie.movieId) {
          similarity.wScore = sim.rating * similarity.distance
        }
      })
    })
  })
}

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

function getMoviesWatched (data, id) {
  return data.ratings.filter(value => {
    if (value.userId === id) {
      return value
    }
  })
}

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
