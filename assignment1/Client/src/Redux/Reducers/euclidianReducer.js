import { EUCLIDIAN_MATCHING_USERS } from '../Actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case EUCLIDIAN_MATCHING_USERS:
      return { ...state }

    default:
      return state
  }
}
