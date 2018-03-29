import React, { Component } from 'react';
import styles from './TwitchButton.css';

export default class TwitchButton extends Component {
  render() {
    return (
      <div id={styles.button}>
        <img src="./glitch.png"/>
        <span id={styles.text}/>
      </div>
    )
  }
}
