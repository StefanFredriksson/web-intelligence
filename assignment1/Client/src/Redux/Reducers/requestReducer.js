import { MATCHING_USERS, RECOMMENDED_MOVIES } from '../Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case MATCHING_USERS:
      return { matchingUsers: action.data }

    case RECOMMENDED_MOVIES:
      return { recMovies: action.data }

    default:
      return state
  }
}
