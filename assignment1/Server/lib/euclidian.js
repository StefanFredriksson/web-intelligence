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

module.exports = {
  getEuclidianDistance
}
