import React,{PropTypes} from 'react'
import styles from './FlightItemTable.css'


export default class FlightItemTable extends React.Component{
  render(){
    return (
      <div>
        <div className={styles.flightItemTable}>

          <div className={styles.flightItemTableHeader + " " + styles.flightItemTableRow}>
            <div className={styles.flightItemTableCell}>Time</div>
            <div className={styles.flightItemTableCell}>Agreement</div>
            <div className={styles.flightItemTableCell}>From</div>
            <div className={styles.flightItemTableCell}>To</div>
            <div className={styles.flightItemTableCell}>Value</div>
            <div className={styles.flightItemTableCell}>Ccy</div>
            <div className={styles.flightItemTableCell}>Status</div>
          </div>

          <div className={styles.flightItemTableRow}>
            <div className={styles.flightItemTableCell}>cell 1</div>
            <div className={styles.flightItemTableCell}>cell 2</div>
            <div className={styles.flightItemTableCell}>cell 3</div>
            <div className={styles.flightItemTableCell}>cell 4</div>
            <div className={styles.flightItemTableCell}>cell 5</div>
            <div className={styles.flightItemTableCell}>cell 6</div>
            <div className={styles.flightItemTableCell}>cell 7</div>
          </div>
        </div>
      </div>
    )
  }
}