import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { channels } from './channels'
import { auth } from './auth'
import { games } from './games'
import { player } from './player'

export default combineReducers({
  channels,
  auth,
  games,
  player,
  routing
});
