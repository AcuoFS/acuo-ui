import React from 'react';
import {List, Set, Map} from 'immutable'

export default class GraphBody extends React.Component {
  constructor(props){
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
  }
  getCircle(){
    let status = this.getDeriv().reduce((setX, x) => {
      return setX.union(x.get('marginStatus').map(y => y.get('status')))
    }, Set()).toList()

    let possibleTimes = this.getDeriv().reduce((setX, x) => {
      return setX.union(x.get('marginStatus').reduce((setY, y) => {
        return setY.union(y.get('timeFrames').map(z => z.get('timeRangeStart')))
      }, Set()))
    }, Set()).toList()

    let graphXY = status.map(x => Map({"status": x, "timeFrames": possibleTimes.map(y => Map({"timeFrame": y, "actionsList": []})), "colour": "yellow"}))

    let plot = graphXY.map(X => {
      return List(Map({"status": X.get('status'), "timeFrames":
        X.get('timeFrames').map(Y => {
          return List(Map({"timeFrame": Y.get('timeFrame'), "actionsList": this.getDeriv().reduce((setX, x) => {
            return setX.union(x.get('marginStatus').reduce((setY, y) => {
              if(y.get('status') == X.get('status')){
                return y.get('timeFrames').filter(z => {
                  return z.get('timeRangeStart') == Y.get('timeFrame')
                })
              }else
                return setY
            }, Set()))
          }, Set()).toList()
          }))
        })
      }))
    })

    // console.log(status)
    console.log(plot)

    // return <circle cx={this.props.x + time} cy={75} r={summation/1000000000} fill="#FFCD2D" />
  }
  getDeriv(){
    return this.props.data || []
  }
  render() {
    return(
      <svg>
        {this.getCircle()}
      </svg>
    )
  }
}

// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FFCD2D" transform='translate( 0)' />
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF7D26" transform='translate(25 45)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#26DA6E" transform='translate(25 90)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#58B6FF" transform='translate(25 135)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF1E25" transform='translate(25 180)'/>
