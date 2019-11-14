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

function getWeightedSimilarities (data, similarities) {
  let weightedSims = []

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
        let weight = 0

        if (sim.weightedSim !== 0) {
          weight = score.weightedSum / sim.weightedSim
        }

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
  getWeightedSums,
  getWeightedSimilarities,
  getFinalWeights,
  removeAlreadyWatchedMovies,
  setWeightedScore
}
