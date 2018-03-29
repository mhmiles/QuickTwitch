import React, { Component } from 'react';
import styles from './GameCell.css';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CATEGORY_GAMES } from '../actions/channels'

export default class GameCell extends Component{
  static propTypes = {
    game: PropTypes.object.isRequired,
    channels: PropTypes.number.isRequired,
    viewers: PropTypes.number.isRequired
  }

  render() {
    let { index, game, channels, viewers } = this.props

    return (
      <li className={styles.gameCell} style={{backgroundImage: `url(${game.box.large})`}}>
        <Link to={["", CATEGORY_GAMES, game.name].join("/")}>
          <div className={styles.gameName}>{game.name}</div>
          <div className={styles.bottomDetails}>
            <div className={styles.stats}>
              <svg width="14px" height="8px" viewBox="0 0 14 8" version="1.1">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <polygon id="Shape" fill="white" points="9 5 9 8 0 8 0 0 9 0 9 3 12 0 14 0 14 8 12 8"></polygon>
                  </g>
              </svg>
              <span>{channels.toLocaleString()}</span>
            </div>
            <div className={styles.stats}>
              <svg className="svg-glyph_live" height="14px" version="1.1" viewBox="0 0 14 14" width="14px" x="0px" y="0px">
                <path clipRule="evenodd" d="M11,14H5H2v-1l3-3h2L5,8V2h6v6l-2,2h2l3,3v1H11z" fillRule="evenodd"></path>
              </svg>
              <span>{viewers.toLocaleString()}</span>
            </div>
          </div>
        </Link>
      </li>
    )
  }


}
