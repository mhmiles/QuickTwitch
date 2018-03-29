import { remote, shell } from 'electron'
import React, { Component } from 'react';
import styles from './ChannelCell.css';
import PropTypes from 'prop-types'

export default class ChannelCell extends Component{
  static propTypes = {
    stream: PropTypes.object.isRequired,
    followChannel: PropTypes.func,
    openPlayer: PropTypes.func.isRequired,
    focusPlayer: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number.isRequired,
  };

  render() {
    let { stream, openPlayer, focusPlayer, isPlaying, lastUpdated, followChannel } = this.props
    let createdAt = new Date(stream.created_at)
    let duration = (Date.now()-createdAt)/1000

    let hours   = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - (hours * 3600)) / 60);

    let durationString = (hours > 0 ? hours+'h ' : '')+minutes+'m';

    let onContextMenu = (e) => {
      let menuTemplate = [{
        label: 'Open Chat',
        click() {
          shell.openExternal(stream.channel.url+'/chat');
        }
      }, {
        label: 'Follow Channel',
        click: followChannel
      }, {
        label: 'Open in Browser',
        click() {
          shell.openExternal(stream.channel.url);
        }
      }, {
        label: 'Open Stream',
        click() {
          openPlayer();
        }
      }]

      remote.Menu.buildFromTemplate(menuTemplate).popup()
    }

    let onClick = () => {
      if (isPlaying) {
        focusPlayer();
      } else {
        openPlayer();
      }
    }

    return (
      <li className={styles.channelCell} onClick={onClick} onContextMenu={onContextMenu}>
        <div className={styles.background} style={{backgroundImage: `url(${stream.preview.large}?v=${lastUpdated})`}}/>
        <div className={styles.details}>
          <div className={styles.detailsLeft}>
            <div className={styles.channelTitle}>{stream.channel.display_name}</div>
            <div className={styles.channelStatus}>{stream.channel.status}</div>
            <div style={{display: 'flex'}}>
              <div className={styles.gameTitle}>{stream.game}</div>
              <div className={styles.duration}>{durationString}</div>
            </div>
          </div>
          <div className={styles.detailsRight}>
            <div className={styles.isPlaying}>{isPlaying ? '▶︎' : ''}</div>
          </div>
        </div>
      </li>
    );
  }
}
