import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GameList from '../components/GameList';
import * as GameActions from '../actions/games';

function mapStateToProps(state) {
  return {
    games: state.games.games
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GameActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
