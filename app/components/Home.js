import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import styles from './Home.css';
import { ChannelContainer } from '../containers/ChannelContainer'
import { CATEGORY_TOP, CATEGORY_GAMES, CATEGORY_FOLLOWING} from '../actions/channels'
import { LOG_IN } from '../actions/auth'
import { shell } from 'electron'
import Twitch from 'twitch-sdk'
import process from 'child_process'
import TopBar from './TopBar'
import { GamesContainer } from '../containers/GamesContainer'

export default class Home extends Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    selectCategory: PropTypes.func.isRequired,
    fetchChannels: PropTypes.func.isRequired,
    invalidateChannels: PropTypes.func.isRequired,
    authInit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired
  };

  render() {
    let { categories, selectedCategory, selectCategory, isAuthenticated } = this.props
    let listElement = selectedCategory === CATEGORY_GAMES ? (<GamesContainer/>) : (<ChannelContainer/>)

    return (
      <div className={styles.home}>
        <TopBar categories={categories} selectedCategory={selectedCategory} selectCategory={selectCategory} isAuthenticated={isAuthenticated}/>
        {listElement}
      </div>
    );
  }

  componentDidMount() {
    this.props.authInit()
  }
}
