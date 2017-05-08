import {connect} from 'react-redux'
import jsonObjectToFlatArray from '../utils/jsonObjectToFlatArray'
import {
  filterStateLegal,
  filterStateDeriv,
  filterStateStatus,
  filterCptyOrg,
  filterCptyEntity,
  filterTimeWindowStatus
} from '../actions'
import {FilterBarComponent} from '../components'
import { Set, Map, List, fromJS } from 'immutable'
import { getDate } from '../utils'


const mapStateToProps = state => ({
  filters: state.mainReducer.getIn(['inputs', 'filters']),
  legalEntityList: computeLegalEntityList(state.mainReducer),
  derivativeType: computeDerivativeType(state.mainReducer),
  timeWindowList: computeTimeWindowList(state.mainReducer, getDate()),
  statusList: computeStatusList(state.mainReducer),
  cptyOrganisation: computeCptyOrganisation(state.mainReducer),
  cptyEntity: computeCptyEntity(state.mainReducer)
})

const computeLegalEntityList = (state) => {
  let derivatives = state.getIn(['data', 'derivatives'])
  let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
  let legalEntitySet = derivativeList.reduce((entitySet, derivative) => (
    entitySet.add(derivative.legalEntity)
  ), Set())
  return legalEntitySet.toArray()
}

const computeDerivativeType = (state) => {
  let derivatives = state.getIn(['data', 'derivatives']) || []
  let derivativeTypeSet = derivatives.reduce((typeSet, derivative) => (
    typeSet.add(derivative.get('type'))
  ), Set())
  return derivativeTypeSet.toArray()
}

const computeStatusList = (state) => {
  let derivatives = state.getIn(['data', 'derivatives'])
  let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
  let marginStatusSet = derivativeList.reduce((marginStatus, derivative) => (
    marginStatus.add(derivative.status)
  ), Set())
  return marginStatusSet.toArray()
}

const computeCptyOrganisation = (state) => {
  let derivatives = state.getIn(['data', 'derivatives'])
  let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
  let cptyOrganisationSet = derivativeList.reduce((cptyOrganisation, derivative) => (
    cptyOrganisation.add(derivative.cptyOrg)
  ), Set())
  return cptyOrganisationSet.toArray()
}

const getYesterday = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, -1)
}

const getTomorrow = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 1)
}

const getToday = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 0)
}

const getDayAfter = (currTime) => {
  const currTimeNew = new Date(currTime)
  return convertDate(currTimeNew, 2)
}

const convertDate = (time, days) => {
  return new Date(new Date(new Date(time.setDate(time.getDate() + days))).setHours(0,0,0,0)).getTime()
}

const computeTimeWindowList = (state, currTime) => {

  //get current date, yesterday, tomorrow
  const yesterdayUnix = getYesterday(currTime)
  const tomorrowUnix = getTomorrow(currTime)
  const todayUnix = getToday(currTime)
  const dayAfterUnix = getDayAfter(currTime)

  const derivatives = state.getIn(['data', 'derivatives']) || List()

  const listOfDays = fromJS([
    {
      "day": "yesterday",
      "minTime": yesterdayUnix,
      "maxTime": todayUnix,
      "times": []
    },
    {
      "day": "today",
      "minTime": todayUnix,
      "maxTime": tomorrowUnix,
      "times": []
    },
    {
      "day": "tomorrow",
      "minTime": tomorrowUnix,
      "maxTime": dayAfterUnix,
      "times": []
    }
  ])

  const something = listOfDays.map((days) => {

    return days.set('times', derivatives.reduce((list, type) => {

      const someList = type.get('marginStatus').reduce((set, status) => {

        return set.union(status.get('timeFrames').reduce((set, timeFrames) => {
          const unixTime = new Date(timeFrames.get('timeRangeStart')).getTime()
          const unixEndTime = new Date(timeFrames.get('timeRangeEnd')).getTime()

          if(unixTime >= days.get('minTime') && unixTime < days.get('maxTime'))
            return set.add(fromJS({'min': unixTime, 'max': unixEndTime}))
          else
            return set
        }, Set()))

      }, Set())

      return list.union(someList)
    }, Set()).toList().sort())
  })

  // console.log(something.toJS())

  return something.toJS()
}

const computeCptyEntity = (state) => {

  let cptyEntityFilter = state.getIn(['inputs', 'filters', 'cptyEntityFilter', 'filter']) || Set()
  let cptyOrgFilter = state.getIn(['inputs', 'filters', 'cptyOrgFilter', 'filter'])

  let derivatives = state.getIn(['data', 'derivatives'])
  let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
  let cptyEntityList = derivativeList.reduce((listSum, x) => {
    if (cptyOrgFilter && cptyOrgFilter != 'All') {
      return (!listSum.includes(x.cptyEntity) && x.cptyOrg == cptyOrgFilter ? listSum.add(x.cptyEntity) : listSum)
    } else {
      return (!listSum.includes(x.cptyEntity) ? listSum.add(x.cptyEntity) : listSum)
    }
  }, Set()).sort()

  if (cptyEntityFilter.size > 0)
    return cptyEntityList.filter(x =>
      cptyEntityFilter.includes(x)
    ).toOrderedSet().sort().union(cptyEntityList.filter(x =>
      !cptyEntityFilter.includes(x)
    ).toOrderedSet().sort()).toArray()
  else
    return cptyEntityList.toArray()
}


const mapDispatchToProps = dispatch => ({

  onLegalEntityChange: (e) => {
    e.stopPropagation()
    dispatch(filterStateLegal(e.currentTarget.dataset.ref))
  },

  onDerivChange: (e) => {
    e.stopPropagation()
    dispatch(filterStateDeriv(e.currentTarget.dataset.ref))
  },

  onStatusChange: (e) => {
    e.stopPropagation()
    dispatch(filterStateStatus((e.currentTarget.dataset.ref).toLowerCase()))
  },

  onCptyOrgChange: (e) => {
    e.stopPropagation()
    dispatch(filterCptyOrg(e.currentTarget.dataset.ref))
  },

  onCPTYEntityChange: (entityList, e) => {
    //e.stopPropagation()
    dispatch(filterCptyEntity(entityList))
  },

  onFilterTimeWindowStatus: (timeWindowMin, timeWindowMax, timeRangeText) => {
    dispatch(filterTimeWindowStatus(timeWindowMin, timeWindowMax, timeRangeText))
  }
})


const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBarComponent)

export default FilterContainer