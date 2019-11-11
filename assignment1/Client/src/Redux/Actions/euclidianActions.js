import { EUCLIDIAN_MATCHING_USERS } from './types'

export const getMatchingUsers = () => async dispatch => {
  let userId = document.querySelector('#select-user').value
  let count = document.querySelector('#select-results').value
  let response = await window.fetch(
    `http://localhost:4000/findmatchingusers/${userId}&${count}`
  )
  response = await response.json()
  console.log(response)
  dispatch({
    type: EUCLIDIAN_MATCHING_USERS
  })
}
