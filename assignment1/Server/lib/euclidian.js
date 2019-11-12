const helper = require('./dataHelpers')

function getEuclidianDistance (userId, data) {
  let similarities = []
  let users = helper.getRatingForUsers(data)
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
  setWeightedScore(similarities, data)
  let weightedSums = getWeightedSums(data)
  let weightedSims = getWeightedSimilarities(data, similarities)
  let finalWeights = getFinalWeights(weightedSums, weightedSims)
  removeAlreadyWatchedMovies(id, finalWeights, data)

  return finalWeights.sort((a, b) => {
    return b.weight - a.weight
  })
}

function setWeightedScore (similarities, data) {
  similarities.forEach(similarity => {
    data.ratings.forEach(rating => {
      if (similarity.userId === rating.userId) {
        rating.weightedScore = similarity.distance * rating.rating
      }
    })
  })
}

function getWeightedSums (data, id) {
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

function getWeightedSimilarities (data, similarities) {
  let weightedSims = []

  data.movies.forEach(movie => {
    let sum = 0
    data.ratings.forEach(rating => {
      if (rating.movieId === movie.movieId && rating.weightedScore) {
        similarities.forEach(sim => {
          if (sim.userId === rating.userId) {
            sum += sim.distance
          }
        })
      }
    })

    weightedSims.push({
      title: movie.title,
      movieId: movie.movieId,
      weightedSim: sum
    })
  })

  return weightedSims
}

function getFinalWeights (weightedScores, weightedSims) {
  let finalWeights = []

  weightedScores.forEach(score => {
    weightedSims.forEach(sim => {
      if (score.movieId === sim.movieId) {
        let weight = score.weightedSum / sim.weightedSim
        finalWeights.push({
          title: score.title,
          movieId: score.movieId,
          weight
        })
      }
    })
  })

  return finalWeights
}

function removeAlreadyWatchedMovies (id, finalWeights, data) {
  data.ratings.forEach(rating => {
    for (let i = finalWeights.length - 1; i >= 0; i--) {
      if (rating.userId === id && rating.movieId === finalWeights[i].movieId) {
        finalWeights.splice(i, 1)
      }
    }
  })
}

module.exports = {
  getEuclidianDistance,
  getRecommendedMovies
}
