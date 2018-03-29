import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as AuthActions from '../actions/auth'
import * as GamesActions from '../actions/games'
import * as ChannelActions from '../actions/channels'

function mapStateToProps(state) {
  return {
    selectedCategory: state.channels.selectedCategory,
    categories: state.channels.categories,
    isFetching: state.channels.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    didInvalidate: state.channels.didInvalidate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AuthActions, GamesActions, ChannelActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
