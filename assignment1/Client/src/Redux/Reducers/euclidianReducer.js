import {
  EUCLIDIAN_MATCHING_USERS,
  EUCLIDIAN_RECOMMENDED_MOVIES
} from '../Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case EUCLIDIAN_MATCHING_USERS:
      return { matchingUsers: action.data }

    case EUCLIDIAN_RECOMMENDED_MOVIES:
      return { recMovies: action.data }

    default:
      return state
  }
}
