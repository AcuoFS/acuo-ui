/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import styles from '../Pledge.css'

class OptItem extends React.Component {
  constructor(props) {
    super(props)

    this.dragg = this.dragg.bind(this)
  }

  componentWillMount() {
    this.setState({
      drag: (5).toFixed(1)
    })
  }

  dragg(e) {
    this.setState({drag: (e.currentTarget.value / 10).toFixed(1)})
  }

  render() {
    return (
      <div className={styles.optItem}>

        <div className={styles.flexContainer}>
          <div className={styles.optItemName}>{this.props.sldName}</div>
          <div className={styles.optItemSlider}>
            <input type="range" step="1" max="100" min="0" onChange={this.dragg}/>
            <div className={styles.markings}>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.marking}>|</div>
              <div className={styles.miniMarking}>|</div>
              <div className={styles.markingLast}>|</div>
            </div>
          </div>
        </div>

        <div className={styles.dragValue}>
          <div className={styles.valueBox}>
            {this.state.drag}
          </div>

        </div>
      </div>
    )
  }
}

export default OptItem