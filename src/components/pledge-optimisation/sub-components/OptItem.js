import React from 'react'
import sharedStyles from '../../pledge/Pledge.css'
import styles from '../OptimisationWidget.css'

export default class OptItem extends React.Component {
  constructor(props) {
    super(props)

    this.updateState = this.updateState.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)

    // this.state = {
    //   left: 180
    // }

  }

  componentWillMount() {
    this.setState({
      name: this.props.sldName,
      allocation: parseFloat(this.props.allocation).toFixed(1)
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

        <div className={sharedStyles.flexContainer}>
          <div className={styles.optItemName}>{this.props.sldName}</div>
          <div className={styles.optItemSlider + ' ' + this.props.sldName}>
            <input className={this.props.sldName} type="range" step="1" max="100" min="0" onMouseUp={this.updateState}
                   onChange={this.updateDisplay} value={this.state.allocation * 10}/>
            {/*<div className={styles.markings}>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.marking}>|</div>*/}
              {/*<div className={styles.miniMarking}>|</div>*/}
              {/*<div className={styles.markingLast}>|</div>*/}
            {/*</div>*/}

            {/*custom slider*/}
            {/*<div className={styles.container}>*/}
              {/*<div className={styles.barContainer}>*/}
                {/*<div className={styles.bar} style={{right: -this.state.left}}>*/}

                {/*</div>*/}
              {/*</div>*/}
              {/*<div className={styles.slider} style={{left: this.state.left}}>*/}

              {/*</div>*/}
            {/*</div>*/}
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