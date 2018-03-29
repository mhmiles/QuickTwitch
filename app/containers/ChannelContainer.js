import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import * as ChannelActions from '../actions/channels';
import * as PlayerActions from '../actions/player'

function mapStateToProps(state) {
  return {
    streams: state.channels.streams,
    connectedStreams: state.player.connectedStreams,
    lastUpdated: state.channels.lastUpdated,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ChannelActions, PlayerActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
