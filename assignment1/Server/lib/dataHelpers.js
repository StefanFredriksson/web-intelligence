const fse = require('fs-extra')
const path = require('path')

async function getData () {
  let destination = path.join(__dirname, '..', 'data', 'movies_large')
  let data = await readFile(destination + '/users.csv')
  let users = getUsers(data)
  data = await readFile(destination + '/ratings.csv')
  let ratings = getRatings(data)
  data = await readFile(destination + '/movies.csv')
  let movies = getMovies(data)

  return { users, ratings, movies }
}

async function readFile (destination) {
  return new Promise((resolve, reject) => {
    fse.readFile(destination, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}

function getUsers (data) {
  data = data.split('\n')
  let users = []

  for (let i = 0; i < data.length; i++) {
    let index = data[i].lastIndexOf(';')
    let id = data[i].slice(0, index)
    let name = data[i].slice(index + 1, data[i].length)

    if (!isNaN(id) && name.length > 0) {
      users.push({ id, name })
    }
  }

  return users
}

function getRatings (data) {
  data = data.split('\n')
  let ratings = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].length > 0) {
      let info = data[i].split(';')
      let userId = info[0]
      let movieId = info[1]
      let rating = info[2]

      if (!isNaN(userId)) {
        ratings.push({ userId, movieId, rating })
      }
    }
  }

  return ratings
}

function getMovies (data) {
  data = data.split('\n')
  let movies = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].length > 0) {
      let info = data[i].split(';')
      let movieId = info[0]
      let title = info[1]
      let year = info[2]

      if (!isNaN(movieId)) {
        movies.push({ movieId, title, year })
      }
    }
  }

  return movies
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
  getData,
  getRatingForUsers
}
