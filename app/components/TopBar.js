import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './TopBar.css';
import { CATEGORY_TOP, CATEGORY_GAMES, CATEGORY_FOLLOWING } from '../actions/channels'
import { LOG_IN } from '../actions/auth'
import TwitchButton from './TwitchButton'
import { Link } from 'react-router-dom'

const categories = [ CATEGORY_TOP, CATEGORY_GAMES, CATEGORY_FOLLOWING ]

export default class TopBar extends Component{
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.authInit()
  }

  render() {
    let selectedCategory = this.props.location.pathname.split("/")[1]

    let button = (category, index) => {
      switch(category) {
        case CATEGORY_TOP:
          return (
            <li key={index} className={selectedCategory === category ? styles.selectedItem : styles.topItem}>
              <Link to={`/${CATEGORY_TOP}`}>
                <svg className="svg-nav_channels" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
                  <path clipRule="evenodd" d="M15,14l-4-4v4H1V4h10v4l4-4h2v10H15z" fillRule="evenodd"></path>
                </svg>
                <span className={styles.categoryTitle}>
                  Top
                </span>
              </Link>
            </li>
          )
        case CATEGORY_GAMES:
           return (
             <li key={index} className={this.props.selectedCategory === category ? styles.selectedItem : styles.topItem}>
               <svg className="svg-nav_games" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
                <path clipRule="evenodd" d="M9,8.293l-3-3V1h6v4.293L9,8.293z M5.293,12H1V6h4.293l3,3L5.293,12z M9,9.707l3,3V17H6v-4.293L9,9.707z M12.707,6H17v6h-4.293l-3-3L12.707,6z" fillRule="evenodd"></path>
              </svg>
              <span className={styles.categoryTitle}>
                {category}
              </span>
            </li>
           )

        case CATEGORY_FOLLOWING:
          return (
            <li key={index} className={this.props.selectedCategory === category ? styles.selectedItem : styles.topItem}>
              <svg className="svg-nav_following" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
                <path clipRule="evenodd" d="M1,8V4l2-2h4l2,2l2-2h4l2,2v4l-8,8L1,8z" fillRule="evenodd"></path>
              </svg>
              <span className={styles.categoryTitle}>
                {category}
              </span>
            </li>
          )

        case LOG_IN:
          return (
            <li key={index} className={styles.topItem} onClick={this.props.logIn()}>
              <TwitchButton/>
            </li>
          )

          default:
            return undefined
      }
    }

    return (
      <ul className={styles.topBar}>
        <li className={selectedCategory === CATEGORY_TOP ? styles.selectedItem : styles.topItem}>
          <Link to={`/${CATEGORY_TOP}`}>
            <svg className="svg-nav_channels" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
              <path clipRule="evenodd" d="M15,14l-4-4v4H1V4h10v4l4-4h2v10H15z" fillRule="evenodd"></path>
            </svg>
            <span className={styles.categoryTitle}>
              Top
            </span>
          </Link>
        </li>
        <li className={selectedCategory === CATEGORY_GAMES ? styles.selectedItem : styles.topItem}>
          <Link to={`/${CATEGORY_GAMES}`}>
            <svg className="svg-nav_games" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
             <path clipRule="evenodd" d="M9,8.293l-3-3V1h6v4.293L9,8.293z M5.293,12H1V6h4.293l3,3L5.293,12z M9,9.707l3,3V17H6v-4.293L9,9.707z M12.707,6H17v6h-4.293l-3-3L12.707,6z" fillRule="evenodd"></path>
           </svg>
           <span className={styles.categoryTitle}>
             Games
           </span>
          </Link>
       </li>
       {
         (() => {
           if (this.props.isAuthenticated) {
             return (
               <li className={selectedCategory === CATEGORY_FOLLOWING ? styles.selectedItem : styles.topItem}>
                <Link to={`/${CATEGORY_FOLLOWING}`}>
                   <svg className="svg-nav_following" height="18px" version="1.1" viewBox="0 0 18 18" width="18px" x="0px" y="0px">
                     <path clipRule="evenodd" d="M1,8V4l2-2h4l2,2l2-2h4l2,2v4l-8,8L1,8z" fillRule="evenodd"></path>
                   </svg>
                   <span className={styles.categoryTitle}>
                     Following
                   </span>
                 </Link>
              </li>
            )
           } else {
             return (
               <li className={styles.topItem} onClick={this.props.logIn}>
                 <TwitchButton/>
               </li>
             )
           }
         })()
       }
      </ul>
    )
  }
}
