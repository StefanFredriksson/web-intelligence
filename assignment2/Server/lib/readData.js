const fse = require('fs-extra')
const path = require('path')

async function getData () {
  const destination = path.join(__dirname, '..', 'data', 'blogdata.txt')
  const data = await readFile(destination)
  return data.toString()
}

function readFile (path) {
  return new Promise((resolve, reject) => {
    fse.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function extractBlogs (data) {
  const lines = data.split('\n')
}

module.exports = {
  getData,
  extractBlogs
}
