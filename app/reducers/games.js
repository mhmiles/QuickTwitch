import { RECEIVE_GAMES } from '../actions/games'
import { SELECT_CATEGORY } from '../actions/channels'
export function games(state = {
   games: []
   }, action) {
  switch(action.type) {
    case RECEIVE_GAMES:
      let preSlice = state.games.slice(0,action.offset)
      let newSlice = action.games
      let postSliceStart = preSlice.length+newSlice.length
      let postSlice = state.games.slice(postSliceStart, state.games.length-postSliceStart)

      return Object.assign({}, state, { games: preSlice.concat(newSlice).concat(postSlice) })

    default:
      return state
  }
}
