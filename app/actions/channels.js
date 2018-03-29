import Twitch from 'twitch-sdk'
import { REQUEST_GAMES, fetchGames } from './games'

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
export function requestChannels(category) {
  return {
    type: REQUEST_CHANNELS,
    category: category
  };
}

export const FETCH_CHANNELS = 'FETCH_CHANNELS'

const limit = 20
export function fetchChannels(category, offset = 0, shouldAppend = false) {
  var method;

  switch (category) {
    case CATEGORY_FOLLOWING:
      method = 'streams/followed'
      break;

    case CATEGORY_TOP:
      method = 'streams'
      break;

    case CATEGORY_GAMES:
      return fetchGames(offset, 50)

    default:
      console.log('Unhandled category: '+category)
  }

  return (dispatch) => {
    dispatch({
      type: REQUEST_CHANNELS,
      category: category
    })

    Twitch.api({method: method, version: "v5", params: {limit: limit, offset: offset}}, (error, streams) => {
      dispatch(receiveChannels(streams, category, offset, shouldAppend))
    })
  }
}

export const REQUEST_CHANNELS_FOR_GAME = 'REQUEST_CHANNELS_FOR_GAME'
function requestChannelsForGame(game, offset) {
  return {
    type: REQUEST_CHANNELS_FOR_GAME,
    game: game,
    offset: offset
  }
}

export const RECEIVE_CHANNELS_FOR_GAME = 'RECEIVE_CHANNELS_FOR_GAME'
export function receiveChannelsForGame(json, game, offset, shouldAppend) {
  return {
    type: RECEIVE_CHANNELS_FOR_GAME,
    streams: json.streams,
    game: game,
    receivedAt: Date.now(),
    offset: offset,
    shouldAppend: shouldAppend
  };
}

export const FETCH_CHANNELS_FOR_GAME = 'FETCH_CHANNELS_FOR_GAME'
export function fetchChannelsForGame(game, offset = 0, shouldAppend = 0) {
  return (dispatch) => {
    dispatch(requestChannelsForGame(game, offset));

    Twitch.api({method: 'streams', params: {game: encodeURIComponent(game), stream_type: 'live', limit: limit, offset: offset}}, (error, channels) => {
      dispatch(receiveChannelsForGame(channels, game, offset, shouldAppend))
    })
  };
}

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
function receiveChannels(json, category, offset, shouldAppend) {
  return {
    type: RECEIVE_CHANNELS,
    category: category,
    streams: json.streams,
    receivedAt: Date.now(),
    offset: offset,
    shouldAppend: shouldAppend
  };
}

export const INVALIDATE_CHANNELS = 'INVALIDATE_CHANNELS'
export function invalidateChannels() {
  return {
    type: INVALIDATE_CHANNELS
  }
}

export const FOLLOW_CHANNEL = 'FOLLOW_CHANNEL'
export function followChannel(userId, channelId) {
  return (dispatch) => {
    dispatch({
      type: FOLLOW_CHANNEL,
      channelId: channelId
    })

    Twitch.api({ method: `users/${userId}/follows/channels/${channelId}`, verb: "PUT", version: "v5"}, (error, response) => {
    })
  }
}

export const UNFOLLOW_CHANNEL = 'UNFOLLOW_CHANNEL'
export function unfollowChannel(userId, channelId) {
  return (dispatch) => {
    dispatch({
      type: UNFOLLOW_CHANNEL,
      channelId: channelId
    })

    Twitch.api({ method: `users/${userId}/follows/channels/${channelId}`, verb: "DELETE", version: "v5"}, (error, response) => {
    })
  }
}

import { logIn, LOG_IN } from './auth'

export const CATEGORY_FOLLOWING = 'CATEGORY_FOLLOWING'
export const CATEGORY_TOP = 'CATEGORY_TOP'
export const CATEGORY_GAMES = 'CATEGORY_GAMES'
