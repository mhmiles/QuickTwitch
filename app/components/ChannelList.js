import React, { Component } from 'react';
import styles from './ChannelList.css';
import ChannelCell from './ChannelCell'
import PropTypes from 'prop-types'
import { CATEGORY_GAMES } from '../actions/channels'

export default class ChannelList extends Component{
  static propTypes = {
    streams: PropTypes.array.isRequired,
    connectedStreams: PropTypes.object.isRequired,
    fetchChannels: PropTypes.func.isRequired,
    fetchChannelsForGame: PropTypes.func.isRequired,
    invalidateChannels: PropTypes.func.isRequired,
    openPlayer: PropTypes.func.isRequired,
    focusPlayer: PropTypes.func.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    token: PropTypes.string,
    location: PropTypes.object.isRequired,
    followChannel: PropTypes.func.isRequired,
    unfollowChannel: PropTypes.func.isRequired,
    userId: PropTypes.string
  }

  render() {
    let { streams, connectedStreams, selectedCategory, focusPlayer, openPlayer, lastUpdated, token, userId } = this.props

    return (
      <ul className={styles.channelList} ref={(el) => this.instance = el } onScroll={this._onScroll}>
          {streams.map((stream, index) => {
            return <ChannelCell key={index}
                                stream={stream}
                                isPlaying={stream.channel.name in connectedStreams}
                                focusPlayer={focusPlayer.bind(this, connectedStreams[stream.channel.name])}
                                openPlayer={openPlayer.bind(this, token, stream.channel.name)}
                                followChannel={userId ? this.props.followChannel.bind(this, userId, stream.channel._id) : undefined}
                                lastUpdated={lastUpdated}/>
          })}
      </ul>
    );
  }

  componentDidMount() {
    let { location, invalidateChannels } = this.props
    invalidateChannels()

    let pathComponents = location.pathname.split("/").slice(1)
    let selectedCategory = pathComponents[0]

    this.fetchChannels = selectedCategory === CATEGORY_GAMES && pathComponents.length > 1 ?
      this.props.fetchChannelsForGame.bind(this, pathComponents[1]) :
      this.props.fetchChannels.bind(this, selectedCategory)

    this.fetchChannels()
  }

  componentWillUpdate(nextProps, nextState) {
    let { location, invalidateChannels } = this.props
    let nextLocation = nextProps.location

    let pathComponents = location.pathname.split("/").slice(1)
    let selectedCategory = pathComponents[0]

    let nextPathComponents = nextLocation.pathname.split("/").slice(1)
    let nextSelectedCategory = nextPathComponents[0]

    if (selectedCategory !== nextSelectedCategory) {
      invalidateChannels()

      this.fetchChannels = nextSelectedCategory === CATEGORY_GAMES && pathComponents.length > 1 ?
        this.props.fetchChannelsForGame.bind(this, nextPathComponents[1]) :
        this.props.fetchChannels.bind(this, nextSelectedCategory)

      this.fetchChannels()
    }
  }

  _onScroll = (event) => {
    if (this.instance.scrollHeight - this.instance.scrollTop - this.instance.offsetHeight < 300) {
      this.fetchChannels(this.props.streams.length, true)
    }
  }
}
