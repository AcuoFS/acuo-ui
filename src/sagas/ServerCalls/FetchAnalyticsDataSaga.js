/**
 * Created by Rui on 14/11/17.
 */
import axios from 'axios'

import { TEST_FETCH_ANALYTICS_DATA } from '../../constants/APIcalls'

export const FetchAnalyticsDataSaga = () => (
  axios.get(TEST_FETCH_ANALYTICS_DATA).then((response) => {
    return response.data
  })
)