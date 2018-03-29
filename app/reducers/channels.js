import { REQUEST_CHANNELS, RECEIVE_CHANNELS, INVALIDATE_CHANNELS, DISCONNECTED_CHANNEL, SELECT_CHANNEL, FETCH_CHANNELS, CATEGORY_TOP, CATEGORY_GAMES, CATEGORY_FOLLOWING, REQUEST_CHANNELS_FOR_GAME, RECEIVE_CHANNELS_FOR_GAME} from '../actions/channels';
import { CHANNEL_VIEW_TOP, CHANNEL_VIEW_FOLLOWING } from '../containers/ChannelContainer'
import { CONNECT_PLAYER, CLOSE_PLAYER } from '../actions/player'

export function channels(state = {
  isFetching: false,
  didInvalidate: false,
  streams: [],
  lastUpdated: Date.now()
}, action) {
  switch (action.type) {
    case REQUEST_CHANNELS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_CHANNELS:
      if (action.shouldAppend) {
        let preSlice = state.streams.slice(0,action.offset)
        let newSlice = action.streams
        let postSliceStart = preSlice.length+newSlice.length
        let postSlice = state.streams.slice(postSliceStart, state.streams.length-postSliceStart)

        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          streams: preSlice.concat(newSlice).concat(postSlice),
          lastUpdated: action.receivedAt
        })
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          streams: action.streams,
          lastUpdated: action.receivedAt
        })
      }

    case RECEIVE_CHANNELS_FOR_GAME:
      var streams

      if (action.shouldAppend) {
        let channelsPreSlice = state.streams.slice(0,action.offset)
        let channelsNewSlice = action.streams
        let channelsPostSliceStart = channelsPreSlice.length+channelsNewSlice.length
        let channelsPostSlice = state.streams.slice(channelsPostSliceStart, state.streams.length-channelsPostSliceStart)

        streams = channelsPreSlice.concat(channelsNewSlice).concat(channelsPostSlice)
      } else {
        streams = action.streams
      }

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        streams: streams,
        lastUpdated: action.receivedAt
      })


    case INVALIDATE_CHANNELS:
      return Object.assign({}, state, {
        streams: [],
        didInvalidate: true
      })

    case DISCONNECTED_CHANNEL:
      return Object.assign({}, state, {
        connectedStreams: state.connectedStreams.delete(action.channel)
      })

    default:
      return state
  }
}
