/**
 * Created by Rui on 28/8/17.
 */
import {
  FLIP_AXES,
  SAGA_ANALYTICS_DATA,
  UPDATE_ANALYTICS_DATA
} from './../constants/ActionTypes'

export const flipAxes = () => ({
  type: FLIP_AXES
})

export const sagaAnalyticsData = () => ({
  type: SAGA_ANALYTICS_DATA
})

export const updateAnalyticsData = (data) => ({
  type: UPDATE_ANALYTICS_DATA,
  data
})