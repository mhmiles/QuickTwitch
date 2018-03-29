import { remote} from 'electron'
import { CONNECT_PLAYER, CLOSE_PLAYER } from '../actions/player'

export function player(state = {
    connectedStreams: {}
}, action) {
switch (action.type) {
  case CONNECT_PLAYER:
    var connectedStreams = Object.assign({}, state.connectedStreams);

    connectedStreams[action.name] = action.pid

    return Object.assign({}, state, {connectedStreams})

  case CLOSE_PLAYER:
    var connectedStreams = Object.assign({}, state.connectedStreams);

    delete connectedStreams[action.name]

    return Object.assign({}, state, {connectedStreams})

  default:
    return state
  }
}
