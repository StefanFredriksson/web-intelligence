import { EUCLIDIAN_MATCHING_USERS, EUCLIDIAN_RECOMMENDED_MOVIES } from './types'

export const getMatchingUsers = () => async dispatch => {
  let userId = document.querySelector('#select-user').value
  let count = document.querySelector('#select-results').value
  let response = await window.fetch(
    `http://localhost:4000/findmatchingusers/${userId}&${count}`
  )
  response = await response.json()

  dispatch({
    type: EUCLIDIAN_MATCHING_USERS,
    data: response.message
  })
}

export const getRecommendedMovies = () => async dispatch => {
  let userId = document.querySelector('#select-user').value
  let count = document.querySelector('#select-results').value
  let response = await window.fetch(
    `http://localhost:4000/findrecommendedmovies/${userId}&${count}`
  )
  response = await response.json()

  dispatch({ type: EUCLIDIAN_RECOMMENDED_MOVIES })
}
