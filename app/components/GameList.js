import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './GameList.css';
import GameCell from './GameCell'

export default class GameList extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired,
    fetchGames: PropTypes.func.isRequired
  }

  render() {
    let { games } = this.props

    return (
      <ul className={styles.gameList} ref={(el) => this.instance = el } onScroll={this._onScroll}>
        {games.map((game, index) => {
          return <GameCell key={index} game={game.game} channels={game.channels} viewers={game.viewers} />
        })}
      </ul>
    )
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  _onScroll = (event) => {
    if (this.instance.scrollHeight - this.instance.scrollTop - this.instance.offsetHeight < 300) {
      this.props.fetchGames(this.props.games.length, true)
    }
  }
}
