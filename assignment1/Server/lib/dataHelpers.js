const fse = require('fs-extra')
const path = require('path')

/**
 * Reads data from files and returns it as an object.
 */
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

/**
 * Reads text from a file and returns it.
 * @param {String} destination Path to the file.
 */
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

/**
 * Extracts users from a string object.
 * @param {String} data String containing all the users.
 */
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

/**
 * Extracts ratings from a string.
 * @param {String} data The data containing all the ratings.
 */
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

/**
 * Extracts movies from a string.
 * @param {String} data String containing all the movies.
 */
function getMovies (data) {
  data = data.split('\n')
  let movies = []

  for (let i = 0; i < data.length; i++) {
    if (data[i].length > 0) {
      let info = data[i].split(';')
      let movieId = info[0]
      let title = info[1]

      if (!isNaN(movieId)) {
        movies.push({ movieId, title })
      }
    }
  }

  return movies
}

/**
 * Gets all the ratings each user has made.
 * @param {{}} data The data containing all the users and ratings.
 */
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

/**
 * Removes elements in a list up to but not including the specified index.
 * @param {[]} list The list to trim.
 * @param {Number} count Number of elements to remove.
 */
function trimList (list, count) {
  if (count < list.length && count >= 0) {
    list = list.slice(0, count)
  }

  return list
}

module.exports = {
  getData,
  getRatingForUsers,
  trimList
}
