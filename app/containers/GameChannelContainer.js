import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import * as ChannelActions from '../actions/games'
import * as PlayerActions from '../actions/player'

function mapStateToProps(state) {
  return {
    streams: state.channels.streams,
    connectedStreams: state.player.connectedStreams,
    lastUpdated: Date.now(),
    token: state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PlayerActions, ChannelActions), dispatch);
}

export const GameChannelContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelList);
