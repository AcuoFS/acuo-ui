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


    let graphXY = status.map(x => Map({"status": x, "timeFrames": possibleTimes.map(y => Map({"timeFrame": y, "actionsLists": []}))}))

    return graphXY.map(X => {
      return Map({"status": X.get('status'), "timeFrames":
        X.get('timeFrames').map(Y => {
          return Map({"timeFrame": Y.get('timeFrame'), "actionsList": this.getDeriv().reduce((setX, x) => {
            return setX.concat(x.get('marginStatus').reduce((setY, y) => {
              if(y.get('status') == X.get('status')){
                return y.get('timeFrames').filter(z => {
                  // console.log(z.toJS())
                  return z.get('timeRangeStart') == Y.get('timeFrame')
                })
              }else
                return setY
            }, List()))
          }, List())
        })
        })
      })
    }).map(x => {
      return x.set('timeFrames', x.get('timeFrames').map(y => {
        //console.log(y.toJS())
        return Map({'timeFrame': y.get('timeFrame'), "inAmount": y.get('actionsList').reduce((a, z) => {
          return a + z.get('actionsList').reduce((a2, xx) => {
            // console.log(xx.toJS())
            return (xx.get('direction') == 'IN' ? a2 + xx.get('initialMargin') : a2)
          }, 0)
        }, 0)
      , "outAmount": y.get('actionsList').reduce((a, z) => {
        return a + z.get('actionsList').reduce((a2, xx) => {
          // console.log(xx.toJS())
          return (xx.get('direction') == 'OUT' ? a2 + xx.get('initialMargin') : a2)
        }, 0)
      }, 0)})
      }))
    }).map((status) => {
      // console.log(status.toJS())
      return status.get('timeFrames').map(timeFrame => {

        let colour = this.getColour(status.get('status'))
        let timeDifference = (Date.parse(new Date(timeFrame.get('timeFrame'))) - (Date.parse(this.props.time)))/3600000

        return List().push(<circle key={status.get('status') + timeFrame.get('timeFrame') + 'in'} cx={this.props.x + (timeDifference + 0.5) * 60 } cy={colour[1]} r={(timeFrame.get('inAmount') === 0)? 0 :(Math.log(timeFrame.get('inAmount'))) } fill={colour[0]}></circle>).push(<circle key={status.get('status') + timeFrame.get('timeFrame') + 'out'} cx={this.props.x + (timeDifference + 0.5) * 60} cy={colour[2]} r={(timeFrame.get('outAmount') === 0)? 0 :(Math.log(timeFrame.get('outAmount'))) } fill={colour[0]}></circle>)
      })
    }).reduce((set, x) => {
      return set.concat(x.reduce((setY, y) => {
        return setY.concat(y.reduce((listZ, z) => {
          return listZ.push(z)
        }, List()))
      }, List()))
    }, List())

  }

  getColour(status){
    switch(status){
      case 'expected':
        return ['#FFCD2D', 42, 418]
      case 'unrecon':
        return ["#FF7D26", 82, 378]
      case 'recon':
        return ["#26DA6E", 122, 338]
      case 'pledge':
        return ["#58B6FF", 162, 298]
      case 'dispute':
        return ["#FF1E25", 202, 258]
    }
  }
  getDeriv(){
    return this.props.data || []
  }
  render() {
    return(
      <svg>
        {this.getCircle().map(x => x)}
      </svg>
    )
  }
}
