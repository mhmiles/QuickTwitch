import React from 'react';
import { Route, Switch } from 'react-router';
import App from './components/App';
import TopBarContainer from './containers/TopBarContainer';
import ChannelContainer from './containers/ChannelContainer';
import GamesContainer from './containers/GamesContainer'
import GameChannelContainer from './containers/GameChannelContainer'
import { CATEGORY_TOP, CATEGORY_GAMES, CATEGORY_FOLLOWING } from './actions/channels'

export default (
  <App>
    <Route component={TopBarContainer}/>
    <Switch>
      <Route path={`/(${CATEGORY_TOP}|${CATEGORY_FOLLOWING}|${CATEGORY_GAMES}/.+)`} component={ChannelContainer} />
      <Route path={`/${CATEGORY_GAMES}`} component={GamesContainer} />
    </Switch>
  </App>
);
