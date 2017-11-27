/**
 * Created by Rui on 14/11/17.
 */
import { TEST_FETCH_ANALYTICS_DATA } from '../../constants/APIcalls'

export const FetchAnalyticsDataSaga = () => (
  fetch(TEST_FETCH_ANALYTICS_DATA).then((response) => {
    return response.json()
  }).then((obj) => {
    // console.log(obj)
    return obj
  })
)