import React from 'react';
import {List, Set, Map} from 'immutable'

export default class GraphBody extends React.Component {
  constructor(props){
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
  }
  getCircle(){
    let circles = []
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
              // console.log("y", y)
              // console.log("X", X)
              if(y.get('status') == X.get('status')){
                console.log(y.get('status'))
                return y.get('timeFrames').filter((z) => {
                  if(z.get('timeRangeStart') == Y.get('timeFrame')){
                    let total
                    let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
                    total = z.get('actionsList').reduce((sum, marginList) => {
                      // console.log(sum + marginList.get('initialMargin'))
                      return sum + marginList.get('initialMargin')
                    }, 0)
                    switch(y.get('status')){
                      case 'expected':
                      circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={75} r={total/10000} fill="#FFCD2D"></circle>)
                      break
                      case 'unrecon':
                      circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={105} r={total/10000} fill="#FF7D26"></circle>)
                      break
                      case 'recon':
                      circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={135} r={total/10000} fill="#26DA6E"></circle>)
                      break
                      case 'pledge':
                      circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={165} r={total/10000} fill="#58B6FF"></circle>)
                      break
                      case 'dispute':
                      circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={195} r={total/10000} fill="#FF1E25"></circle>)
                    }
                    return
                  } else {
                    return " "
                  }
                })
              }else
                return setY
              }, Set()))
            }, Set()).toList()
          }))
        })
      }))
    })
    // return plot
    console.log(circles)

    return circles.map(x => {
      return x
    })
    // console.log(plot)

    // return <circle cx={this.props.x} cy={75} r={10} fill="#FFCD2D" />
  }
  getDeriv(){
    return this.props.data || []
  }
  render() {
    // console.log(this.getCircle())
    return(
      <svg>
        {this.getCircle()}
      </svg>
    )
  }
}


// if(y.get('status') == 'expected'){
//   return y.get('timeFrames').filter((z) => {
//     if(z.get('timeRangeStart') == Y.get('timeFrame')){
//       let total
//       let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
//       total = z.get('actionsList').reduce((sum, marginList) => {
//         // console.log(sum + marginList.get('initialMargin'))
//         return sum + marginList.get('initialMargin')
//       }, 0)
//       circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={75} r={total/10000} fill="#FFCD2D"></circle>)
//       return
//     }
//   })
// }
// else if(y.get('status') == 'unrecon'){
//   return y.get('timeFrames').filter((z) => {
//     if(z.get('timeRangeStart') == Y.get('timeFrame')){
//       let total
//       let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
//       total = z.get('actionsList').reduce((sum, marginList) => {
//         // console.log(sum + marginList.get('initialMargin'))
//         return sum + marginList.get('initialMargin')
//       }, 0)
//       circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={105} r={total/10000} fill="#FF7D26"></circle>)
//       return
//     }
//   })
// }
// else if(y.get('status') == 'recon'){
//   return y.get('timeFrames').filter((z) => {
//     if(z.get('timeRangeStart') == Y.get('timeFrame')){
//       let total
//       let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
//       total = z.get('actionsList').reduce((sum, marginList) => {
//         // console.log(sum + marginList.get('initialMargin'))
//         return sum + marginList.get('initialMargin')
//       }, 0)
//       circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={135} r={total/10000} fill="#26DA6E"></circle>)
//       return
//     }
//   })
// }
// else if(y.get('status') == 'pledge'){
//   return y.get('timeFrames').filter((z) => {
//     if(z.get('timeRangeStart') == Y.get('timeFrame')){
//       let total
//       let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
//       total = z.get('actionsList').reduce((sum, marginList) => {
//         // console.log(sum + marginList.get('initialMargin'))
//         return sum + marginList.get('initialMargin')
//       }, 0)
//       circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={165} r={total/10000} fill="#58B6FF"></circle>)
//       return
//     }
//   })
// }
// else{
//   return y.get('timeFrames').filter((z) => {
//     if(z.get('timeRangeStart') == Y.get('timeFrame')){
//       let total
//       let timeDifference = ((Date.parse(this.props.time) - Date.parse(z.get('timeRangeStart')))/3600000)
//       total = z.get('actionsList').reduce((sum, marginList) => {
//         // console.log(sum + marginList.get('initialMargin'))
//         return sum + marginList.get('initialMargin')
//       }, 0)
//       circles.push(<circle cx={this.props.x + timeDifference * 57.5} cy={195} r={total/10000} fill="#FF1E25"></circle>)
//       return
//     }
//   })
// }

// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FFCD2D" transform='translate( 0)' />
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF7D26" transform='translate(25 45)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#26DA6E" transform='translate(25 90)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#58B6FF" transform='translate(25 135)'/>
// <circle cx={this.props.x} cy={this.props.y} r="20" fill="#FF1E25" transform='translate(25 180)'/>
