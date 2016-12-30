import React from 'react';
import { List, Set, Map } from 'immutable'
import styles from '../Graph.css'
import { browserHistory } from 'react-router'

export default class GraphBody extends React.Component {

  constructor(props){
    super(props)
    this.getDeriv = this.getDeriv.bind(this)
  }

  whichClickFuncToRun(status){
    switch(status){
      case 'expected':
        return () => 0
      case 'unrecon':
        return () => browserHistory.push('/recon')
      case 'recon':
        return () => browserHistory.push('/pledge')
      case 'pledge':
        return () => browserHistory.push('/deployed')
      case 'dispute':
        return () => browserHistory.push('/dispute')
    }
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

    let graphXY = status.map(x => Map({"status": x, "timeFrames": possibleTimes.map(y => Map({"timeFrame": y, "actionsLists": List()}))}))

    return graphXY.map(X => {
      return Map({"status": X.get('status'), "timeFrames":
        X.get('timeFrames').map(Y => {
          return Map({"timeFrame": Y.get('timeFrame'), "actionsList": this.getDeriv().reduce((setX, x) => {
            return setX.concat(x.get('marginStatus').reduce((setY, y) => {
              if(y.get('status') == X.get('status')){
                return y.get('timeFrames').filter(z => {
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
        return Map({'timeFrame': y.get('timeFrame'),
            "inAmount": y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {
              return (xx.get('direction') == 'IN' ? a2 + xx.get('initialMargin') : a2)
            }, 0)
          }, 0)
          , "outAmount": y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {
              return (xx.get('direction') == 'OUT' ? a2 + xx.get('initialMargin') : a2)
            }, 0)
          }, 0)
          , "inNo":  y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {
              return (xx.get('direction') == 'IN' ? a2+1 : a2)
            }, 0)
          }, 0)
          , "outNo":  y.get('actionsList').reduce((a, z) => {
            return a + z.get('actionsList').reduce((a2, xx) => {

              return (xx.get('direction') == 'OUT' ? a2+1 : a2)
            }, 0)
          }, 0)
        })
      }))
    }).map((status) => {
      return status.get('timeFrames').map(timeFrame => {

        let colour = this.getColour(status.get('status'))
        let timeDifference = (Date.parse(new Date(timeFrame.get('timeFrame'))) - (Date.parse(this.props.time)))/3600000

        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const onClickFunc = this.whichClickFuncToRun(status.get('status'))

        return List()
        .push((timeFrame.get('inAmount') === 0)? 0 :
          <g id={styles.componentId} key={status.get('status') + timeFrame.get('timeFrame') + 'in'}>
            <circle cx={this.props.x + (timeDifference + 0.5) * 60} cy={colour[2]} r={(timeFrame.get('inAmount') === 0)? 0 :(Math.log(timeFrame.get('inAmount'))) } fill={colour[0]}>
            </circle>
            <g className={styles.toolTip} opacity="0.9">
              <rect x={(timeFrame.get('inAmount') > 100000000 || status.get('status').length > 7) ? this.props.x - 110 + (timeDifference + 0.5) * 60 : this.props.x - 90 + (timeDifference + 0.5) * 60} y={colour[2] - 20} rx="4" width={(timeFrame.get('inAmount') > 100000000 || status.get('status').length > 7) ? 100 : 80} height="45" strokeWidth="1" stroke={colour[0]} fill="#FFFFFF"></rect>
              <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[2] - 2.5} fontSize="13" fontFamily="helvetica" fontWeight="bold" fill="#010101" textAnchor="end">{timeFrame.get('inNo')} {status.get('status').toUpperCase()}</text>
              <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[2] + 17.5} fontSize="13" fontFamily="helvetica" fill="#010101" textAnchor="end">{numberWithCommas(timeFrame.get('inAmount'))}</text>
            </g>
          </g>)
          .push((timeFrame.get('outAmount') === 0)? 0 :
            <g id={styles.componentId} key={status.get('status') + timeFrame.get('timeFrame') + 'out'} onClick={onClickFunc}>
              <circle cx={this.props.x + (timeDifference + 0.5) * 60} cy={colour[1]} r={(timeFrame.get('outAmount') === 0)? 0 :(Math.log(timeFrame.get('outAmount'))) } fill={colour[0]}>
              </circle>
              <g className={styles.toolTip} opacity="0.9">
                <rect x={(timeFrame.get('outAmount') > 100000000 || status.get('status').length > 7) ? this.props.x - 110 + (timeDifference + 0.5) * 60 : this.props.x - 90 + (timeDifference + 0.5) * 60} y={colour[1] - 20} rx="4" width={(timeFrame.get('outAmount') > 100000000 || status.get('status').length > 7) ? 100 : 80} height="45" strokeWidth="1" stroke={colour[0]} fill="#FFFFFF"></rect>
                <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[1] - 2.5} fontSize="13" fontFamily="helvetica" fontWeight="bold" fill="#010101" textAnchor="end">{timeFrame.get('outNo')} {status.get('status').toUpperCase()}</text>
                <text x={this.props.x - 12 + (timeDifference + 0.5) * 60} y={colour[1] + 17.5} fontSize="13" fontFamily="helvetica" fill="#010101" textAnchor="end">{numberWithCommas(timeFrame.get('outAmount'))}</text>
              </g>
            </g>)
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
