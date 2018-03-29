import Twitch from 'twitch-sdk'

export const REQUEST_GAMES = 'REQUEST_GAMES'
function requestGames(offset) {
  return {
    type: REQUEST_GAMES,
    offset: offset
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export function receiveGames(games, offset) {
  return {
    type: RECEIVE_GAMES,
    games: games,
    receivedAt: Date.now(),
    offset: offset
  };
}

export function fetchGames(offset = 0) {
  return (dispatch) => {
    dispatch(requestGames(offset));

    Twitch.api({method: 'games/top', params: {limit: 20, offset: offset}}, (error, json) => {
      if (error) {
        console.log(error)
      }
      dispatch(receiveGames(json.top, offset))
    })
  };
}

export const SELECT_GAME = 'SELECT_GAME'
export function selectGame(game) {
  return {
    type: SELECT_GAME,
    game: game
  }
}
