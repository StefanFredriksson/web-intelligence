function getEuclidianDistance (userId, data) {
  let similarities = []
  let users = getRatingForUsers(data)
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

function getRatingForUsers (data) {
  let users = []

  for (let i = 0; i < data.users.length; i++) {
    let ratings = data.ratings.filter(value => {
      if (value.userId === data.users[i].id) {
        return value
      }
    })

    users.push({ name: data.users[i].name, userId: data.users[i].id, ratings })
  }

  return users
}

function getRecommendedMovies (similarities, data) {
  setWeightedScore(similarities, data)
  let weightedSums = getWeightedSums(data)
  let weightedSims = getWeightedSimilarities(data, similarities)
}

function setWeightedScore (similarities, data) {
  similarities.forEach(similarity => {
    data.ratings.forEach(rating => {
      if (similarity.userId === rating.userId) {
        rating.weightedScore = similarity.distance.toFixed(2) * rating.rating
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
      movieId: movie.movieId,
      weightedSum: sum.toFixed(2)
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
            let distance = Number(sim.distance.toFixed(2))
            sum += distance
          }
        })
      }
    })

    weightedSims.push({ movieId: movie.movieId, weightedSim: sum.toFixed(2) })
  })

  return weightedSims
}

module.exports = {
  getEuclidianDistance,
  getRecommendedMovies
}
