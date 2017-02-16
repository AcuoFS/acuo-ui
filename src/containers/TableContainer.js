import { connect } from 'react-redux'
import { TableComponent } from '../components'
import { updateReconFilter } from '../actions'
import { clearTime, getDate } from '../utils'
import _ from 'lodash'


const mapStateToProps = state => ({
  derivatives: state.mainReducer.getIn(['display', 'derivatives']).toJS() || []
})

const mapDispatchToProps = dispatch => ({

  redirect: (value) => {
    dispatch(updateReconFilter({
      attr: 'type',
      selected: {
        label: value.toUpperCase(),
        value: value
  },
  onLineItemClick: (type, status, notificationTime, cptyEntity, legalEntity, cptyOrg) => {

    let dateText = ''

    /**
     * calculate reference to today
     */

    const now = getDate()
    const itemTime = new Date(notificationTime)
    const hours = itemTime.getHours()

    const oneDayTime = 24 * 60 * 60 * 1000

    // create critical points
    const d = clearTime(now)
    const dMinusOne = new Date(d.getTime() - oneDayTime)
    const dPlusOne = new Date(d.getTime() + oneDayTime)
    const dPlusTwo = new Date(d.getTime() + 2 * oneDayTime)

    console.log(now)
    console.log(notificationTime)
    console.log(dMinusOne, itemTime, d)
    console.log(_.inRange(itemTime.getTime(), dMinusOne.getTime(), d.getTime()))

    if(_.inRange(itemTime, dMinusOne.getTime(), d.getTime()))
      dateText = 'yesterday'
    else if(_.inRange(itemTime, d.getTime(), dPlusOne.getTime()))
      dateText = 'yesterday'
    else if(_.inRange(itemTime, dPlusOne.getTime(), dPlusTwo.getTime()))
      dateText = 'tomorrow'
    else
      dateText = 'failed'


    return dispatch(updateReconFilter({
      attr: 'type',
      selected: {
        label: type.toUpperCase(),
        value: type
      }
    })),
    dispatch(updateReconFilter({
      attr: 'status',
      selected: {
        label: status.toUpperCase(),
        value: type
      }
    })),
    dispatch(updateReconFilter({
      attr: 'cptyEntity',
      selected: {
        label: cptyEntity.toUpperCase(),
        value: cptyEntity
      }
    })),
    dispatch(updateReconFilter({
      attr: 'notificationTime',
      selected: {
        label: dateText.toUpperCase() + ': ' + hours + ':00 HRS',
        value: itemTime
      }
    })),
    dispatch(updateReconFilter({
      attr: 'legalEntity',
      selected: {
        label: legalEntity.toUpperCase(),
        value: legalEntity
      }
    })),
    dispatch(updateReconFilter({
      attr: 'cptyOrg',
      selected: {
        label: cptyOrg.toUpperCase(),
        value: cptyOrg
      }
    }))
  }
})

const TableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export default TableContainer
