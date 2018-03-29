import { TWITCH_LOGIN, AUTH_INIT, AUTH_READY, RECEIVE_LOGIN, RECEIVE_USER } from '../actions/auth'

export function auth(state = {
  isInitialized: false,
  isAuthenticated: false,
  token: null,
  userId: null
}, action) {
  switch(action.type) {
    case AUTH_INIT:
      return state

    case AUTH_READY:
      return Object.assign({}, state, {isInitialized: true})

    case RECEIVE_LOGIN:
      return Object.assign({}, state, {isAuthenticated: true, token: action.token})

    case RECEIVE_USER:
      return Object.assign({}, state, {userId: String(action.user._id)})

    default:
      return state
    }
  }
