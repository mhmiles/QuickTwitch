import Twitch from 'twitch-sdk'
import { CATEGORY_FOLLOWING, CATEGORY_TOP, selectCategory } from './channels'
import process from 'child_process'

export const AUTH_INIT = 'AUTH_INIT'
export function authInit() {
  let token = localStorage.getItem('token')
  let clientId = 'jbqra7670tatzt8zovf35p1a6opckqd'

  return (dispatch) => {
    if  (token !== null ) {
      Twitch.init({clientId: clientId, session: {token: token}, electron: true}, function(error, status) {
        if (error) {
          console.log(error)
        }

        dispatch(receiveLogin(token))
      })
    } else {
      Twitch.init({clientId: clientId, electron: true}, function(error, status) {
        if (error) {
          console.log(error)
        }
      })
    }
  }
}

export const AUTH_READY = 'AUTH_READY'
function authReady() {
  return (dispatch) => {
    dispatch(fetchUser())

    dispatch({
      type: AUTH_READY
    })
  }
}

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}


export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
function receiveLogin(token) {
  return (dispatch) => {
    dispatch({
      type: RECEIVE_LOGIN,
      token: token
    })

    dispatch(authReady());
  }
}

export const LOG_IN = 'LOG_IN'
export function logIn() {
  return (dispatch) => {
    dispatch(requestLogin())

    Twitch.events.on('auth.login', () => {
      var token = Twitch.getToken()
      localStorage.setItem('token', token)
      dispatch(receiveLogin(token))
    })

    Twitch.login({
      scope: ['user_read', 'user_follows_edit']
    });
  }
}

export const FETCH_USER = 'FETCH_USER'
export function fetchUser() {
  return (dispatch) => {
    dispatch(requestUser())

    Twitch.api({method: 'user'}, (error, user) => {
      dispatch(receiveUser(user))
    })
  }
}

export const REQUEST_USER = 'REQUEST_USER'
function requestUser() {
  return {
    type: REQUEST_USER
  }
}

export const RECEIVE_USER = 'RECEIVE_USER'
function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user
  }
}
