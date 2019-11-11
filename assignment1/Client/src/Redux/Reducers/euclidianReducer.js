import { EUCLIDIAN_MATCHING_USERS } from '../Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case EUCLIDIAN_MATCHING_USERS:
      return { matchingUsers: action.data }

    default:
      return state
  }
}
