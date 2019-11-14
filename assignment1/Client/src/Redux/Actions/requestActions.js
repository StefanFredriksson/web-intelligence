import { MATCHING_USERS, RECOMMENDED_MOVIES } from './types'
import requests from '../../Utils/requests'

/**
 * Dispatches an action to retrieve the matching users.
 */
export const matchingUsers = () => async dispatch => {
  let similarity = document.querySelector('#select-similarity').value
  let data = await requests.getRecommendedData(
    `http://localhost:4000/${similarity}/matchingusers`
  )

  dispatch({
    type: MATCHING_USERS,
    data: data.message
  })
}

/**
 * Dispatches an action to retrieve the recommended movies.
 * @param {Boolean} isItemBased Determines whether to use item-based filtering or not.
 */
export const recommendedMovies = isItemBased => async dispatch => {
  let data = []
  if (!isItemBased) {
    let similarity = document.querySelector('#select-similarity').value
    data = await requests.getRecommendedData(
      `http://localhost:4000/${similarity}/recommendedmovies`
    )
  } else {
    data = await requests.getRecommendedData(
      `http://localhost:4000/item-based/recommendedmovies`
    )
  }

  dispatch({ type: RECOMMENDED_MOVIES, data: data.message })
}
