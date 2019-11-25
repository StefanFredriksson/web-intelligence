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
  const blogs = []
  const words = lines[0].split('\t')
  lines.splice(0, 1)

  lines.forEach(line => {
    const lineData = line.split('\t')
    if (lineData[0].length > 0) {
      const obj = { title: lineData[0], wordCount: [] }

      for (let i = 1; i < lineData.length; i++) {
        obj.wordCount.push({ word: words[i], count: lineData[i] })
      }

      blogs.push(obj)
    }
  })

  return blogs
}

module.exports = {
  getData,
  extractBlogs
}
