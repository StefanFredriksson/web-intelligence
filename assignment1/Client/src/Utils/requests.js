/**
 * Fetches data from the given url.
 * @param {String} url Url to fetch the data from.
 */
async function getRecommendedData (url) {
  let userId = document.querySelector('#select-user').value
  let count = document.querySelector('#select-results').value
  let response = await window.fetch(`${url}/${userId}&${count}`)
  return response.json()
}

module.exports = {
  getRecommendedData
}
