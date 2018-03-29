import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TopBar from '../components/TopBar';
import * as AuthActions from '../actions/auth'

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AuthActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
