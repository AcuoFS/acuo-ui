/**
 * Created by panyong on 22/11/16.
 */
import React from 'react'
import {render} from 'react-dom'
import styles from '../Pledge.css'

class OptItem extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)

  }

  componentWillMount() {
    this.setState({
      name: this.props.sldName,
      allocation: (this.props.allocation).toFixed(1)
    })
  }

  updateState(e) {
    this.props.onUpdate({
      "name": this.state.name,
      "rating": (e.currentTarget.value / 10).toFixed(1)
    })
  }

  updateDisplay(e){
    this.setState({
      allocation: (e.currentTarget.value / 10).toFixed(1)
    })
  }

  render() {
    return (
      <div className={styles.optItem}>

        <div className={styles.flexContainer}>
          <div className={styles.optItemName}>{this.props.sldName}</div>
          <div className={styles.optItemSlider}>
            <input type="range" step="1" max="100" min="0" onMouseUp={this.updateState} onChange={this.updateDisplay} value={this.state.allocation * 10}/>
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
            {this.state.allocation}
          </div>

        </div>
      </div>
    )
  }
}

export default OptItem