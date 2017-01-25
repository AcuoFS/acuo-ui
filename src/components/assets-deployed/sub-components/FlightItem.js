import React, {Proptypes} from 'react'
import {ARRIVALS} from '../../../constants/FlightTypes'
import FlightItemTable from './FlightItemTable'
import styles from './FlightItem.css'


export default class FlightItem extends React.Component {
  isArrival(flightType){
    return flightType == ARRIVALS
  }

  render() {
    let imgUrl
    if (this.isArrival(this.props.name)){
      imgUrl = "./images/assets_deployed/icon_arrival_plane.png"
    }else{
      imgUrl = "./images/assets_deployed/icon_departure_plane.png"
    }

    return (
      <div className={styles.flightItemComponent}>
        <div className={styles.flightTitle}>
          <span className={styles.flightTitleText + " " +
          (this.isArrival(this.props.name) ? styles.flightTitleText_arr : "")}>
            {this.props.name}</span>
          <img className={styles.iconStyle} src={imgUrl}/>
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.headerDates}>Dates</div>
          <input type="text" placeholder="Search" className={styles.headerSearch}/>
        </div>
        <FlightItemTable isArrival={this.isArrival(this.props.name)}/>
      </div>
    )
  }
}